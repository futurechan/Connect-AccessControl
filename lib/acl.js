var Boom = require('boom');

var Acl = function(){

	this.list={};
}

function ensureArray(param){
	return (param instanceof Array)
		? param
		: [param];
}

Acl.prototype.allow=function(allowance){
	var acl = this;
	
	if(allowance instanceof Array){
		var bound = acl.allow.bind(acl);
		return allowance.forEach(bound)	
	}
	
	var roles = ensureArray(allowance.roles)
	
	roles.forEach(function(role){
	
		var r = acl.list[role] = acl.list[role] || {};
		
		allowance.allows.forEach(function(allow){
		
			var resources = ensureArray(allow.resources);
		
			resources.forEach(function(resource){
			
				var p = r[resource] = r[resource] || [];
				
				var permissions = ensureArray(allow.permissions);
			
				permissions.forEach(function(permission){				
					if(p.indexOf(permission) < 0) p.push(permission);
				})
			})
		})
	})	
}

function getResourcePermissions(role, resource){
	var rr = role[resource];		
	
	if(rr) return rr;
	
	var keys = Object.keys(role);
	
	for(var i=0; i<keys.length;i++){
		var regex = new RegExp("^"+keys[i]+"$");
        if(resource.match(regex)) return role[keys[i]];
	}
}

Acl.prototype.check=function(roles, resource, permission, cb){
	var acl = this;
	
	roles = ensureArray(roles);
	
	for(var i=0; i<roles.length;i++){
		var role = roles[i];		
		var r = acl.list[role];	
		if(!r) continue;
		
		var permissions = getResourcePermissions(r, resource)
		
		if(!permissions) continue;
		
		if(permissions.indexOf(permission) > -1)
			return cb(null, true);
	
	}
	
	cb(null, false);
}

Acl.prototype.middleware=function(opts){

	var acl = this;
	
	opts = opts || {};
	
	roleProvider = opts.roleProvider || function(req){ return req.user.roles;}
	resourceProvider = opts.resourceProvider || function(req){ return req.url;}
	permissionProvider = opts.permissionProvider || function(req){ return req.method.toLowerCase();}
	 
	return function(req,res,next){	
		var roles = roleProvider(req);
		roles = ensureArray(roles);
		
		var resource = resourceProvider(req);
		var permission = permissionProvider(req);
					
		var bound = acl.check.bind(acl);
		
		bound(roles, resource, permission, function(err, isAllowed){
			if(err) return next(err);
			
			if(!isAllowed) return next(Boom.forbidden('Insufficient permissions to access resource'));
			
			next();
		});
	}
}


module.exports = Acl;





