var chai = require('chai')
	, expect = chai.expect
	, Acl = require('../lib/acl')
;

describe('Acl.middleware()', function(){

	var acl;
	
	beforeEach(function(){	
		acl = new Acl();
	})
	
	it('should use req.user.roles, req.route.path, req.method when opts are not provided', function(done){
	
		acl.allow({
			roles:'role', 
			allows:[
				{ resources:'/resource', permissions:'get'},	
				{ resources:'/resource/:id', permissions:'get'},		
				{ resources:'/resource', permissions:'post'},		
				{ resources:'/resource/:id', permissions:'put'}			
			]		
		})
	
		var middleware = acl.middleware();
		
		var req = {
			user:{
				roles:['role']
			},
			url:'/resource/:id',
			method:'GET'
		};
		
		var res = {};
		
		middleware(req,res,function(err){
			expect(err).to.not.be.ok;			
			done();
		});		
	})	
	
	it('should use a custom method for locating user roles if provided', function(done){
	
		acl.allow({
			roles:'role', 
			allows:[
				{ resources:'/resource', permissions:'get'},	
				{ resources:'/resource/:id', permissions:'get'},		
				{ resources:'/resource', permissions:'post'},		
				{ resources:'/resource/:id', permissions:'put'}			
			]		
		})
		
		var opts = {
			roleProvider: function(req){
				return req.someRolesProperty;
			}
		}
	
		var middleware = acl.middleware(opts);
		
		var req = {
			someRolesProperty:['role'],
			url:'/resource/:id',
			method:'GET'
		};
		
		var res = {};
		
		middleware(req,res,function(err){
			expect(err).to.not.be.ok;			
			
			done();
		});		
	})	
	
	it('should use a custom method for getting the requested resource if provided', function(done){
	
		acl.allow({
			roles:'role', 
			allows:[
				{ resources:'/resource', permissions:'get'},	
				{ resources:'/resource/:id', permissions:'get'},		
				{ resources:'/resource', permissions:'post'},		
				{ resources:'/resource/:id', permissions:'put'}			
			]		
		})
		
		var opts = {
			resourceProvider: function(req){
				return '/resource';
			}
		}
	
		var middleware = acl.middleware(opts);
		
		var req = {
			user:{
				roles:['role']
			},			
			method:'GET'
		};
		
		var res = {};
		
		middleware(req,res,function(err){
			expect(err).to.not.be.ok;			
			done();
		});		
	})	
	
	it('should use a custom method for checking the permission if provided', function(done){
	
		acl.allow({
			roles:'role', 
			allows:[
				{ resources:'/resource', permissions:'get'},	
				{ resources:'/resource/:id', permissions:'get'},		
				{ resources:'/resource', permissions:'post'},		
				{ resources:'/resource/:id', permissions:'put'}			
			]		
		})
		
		var opts = {
			permissionProvider: function(req){
				return 'get';
			}
		}
	
		var middleware = acl.middleware(opts);
		
		var req = {
			user:{
				roles:['role']
			},
			url:'/resource/:id',
		};
		
		var res = {};
		
		middleware(req,res,function(err){
			expect(err).to.not.be.ok;			
			
			done();
		});		
	})	
	
})