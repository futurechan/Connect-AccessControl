var chai = require('chai')
	, expect = chai.expect
	, Acl = require('../lib/acl')
;

describe('Acl.check()', function(){

	var acl;
	
	beforeEach(function(){	
		acl = new Acl();
	})
	
	it('should accept a string as a role for a check', function(done){
	
		acl.allow({
			roles:'role', 
			allows:[
				{ resources:'/resource', permissions:'get'}			
			]		
		})
	
		acl.check('role', '/resource', 'get', function(err, isAllowed){
			expect(err).to.not.be.ok;
			expect(isAllowed).to.be.true;			
			
			done();
		});
	})	
	
	it('should accept an array of role strings for a check', function(done){
	
		acl.allow({
			roles:'role1', 
			allows:[
				{ resources:'/resource', permissions:'get'}			
			]		
		})
	
		acl.check(['role1','role2'], '/resource', 'get', function(err, isAllowed){
			expect(err).to.not.be.ok;
			expect(isAllowed).to.be.true;			
			
			done();
		});
	})	
	
	it('should return false if the role is not found', function(done){
	
		acl.allow({
			roles:'role1', 
			allows:[
				{ resources:'/resource', permissions:'get'}			
			]		
		})
	
		acl.check(['role2'], '/resource', 'get', function(err, isAllowed){
			expect(err).to.not.be.ok;
			expect(isAllowed).to.be.false;			
			
			done();
		});
	})	
	
	it('should return false if the resource is not found for that role', function(done){
	
		acl.allow([
			{
				roles:'role1', 
				allows:[
					{ resources:'/resource1', permissions:'get'}			
				]		
			},{
				roles:'role2', 
				allows:[
					{ resources:'/resource2', permissions:'get'}			
				]		
			}
		])
	
		acl.check(['role2'], '/resource1', 'get', function(err, isAllowed){
			expect(err).to.not.be.ok;
			expect(isAllowed).to.be.false;			
			
			done();
		});
	})	
	
	it('should return false if the permission for a resource is not found for that role', function(done){
	
		acl.allow([
			{
				roles:'role1', 
				allows:[
					{ resources:'/resource1', permissions:'get'}			
				]		
			},{
				roles:'role2', 
				allows:[
					{ resources:'/resource1', permissions:'put'}			
				]		
			}
		])
	
		acl.check(['role2'], '/resource1', 'get', function(err, isAllowed){
			expect(err).to.not.be.ok;
			expect(isAllowed).to.be.false;			
			
			done();
		});
	})	
})