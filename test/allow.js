var chai = require('chai')
	, expect = chai.expect
	, Acl = require('../lib/acl')
;

describe('Acl.allow()', function(){

	var acl;
	
	beforeEach(function(){	
		acl = new Acl();
	})
	
	it('should accept a string as a role for an allowance', function(done){
	
		acl.allow({
			roles:'role', 
			allows:[
				{ resources:'/resource', permissions:'get'}			
			]		
		})
		
		expect(acl.list).to.include.keys('role');		
		expect(acl.list['role']).to.include.keys('/resource');		
		expect(acl.list['role']['/resource']).to.include('get');
	
		done();
	})	
	
	it('should accept an array of role strings for an allowance', function(done){
	
		acl.allow({
			roles:['role1', 'role2'], 
			allows:[
				{ resources:'/resource', permissions:'get'}			
			]		
		})
		
		expect(acl.list).to.include.keys('role1');		
		expect(acl.list['role1']).to.include.keys('/resource');		
		expect(acl.list['role1']['/resource']).to.include('get');
	
		expect(acl.list).to.include.keys('role2');
		expect(acl.list['role2']).to.include.keys('/resource');		
		expect(acl.list['role2']['/resource']).to.include('get');
		
		done();
	})	
	
	it('should accept a string as a resource for an allowance', function(done){
	
		acl.allow({
			roles:['role'], 
			allows:[
				{ resources:'/resource', permissions:'get'}			
			]		
		})
		
		expect(acl.list).to.include.keys('role');		
		expect(acl.list['role']).to.include.keys('/resource');		
		expect(acl.list['role']['/resource']).to.include('get');
	
		done();
	})	
	
	it('should accept an array of resource strings for an allowance', function(done){
	
		acl.allow({
			roles:['role'], 
			allows:[
				{ resources:['/resource1', '/resource2'], permissions:'get'}			
			]		
		})
		
		expect(acl.list).to.include.keys('role');
		
		expect(acl.list['role']).to.include.keys('/resource1');		
		expect(acl.list['role']['/resource1']).to.include('get');
	
		expect(acl.list['role']).to.include.keys('/resource2');		
		expect(acl.list['role']['/resource2']).to.include('get');
		
		done();
	})	
	
	it('should accept a string as a permission for an allowance', function(done){
	
		acl.allow({
			roles:['role'], 
			allows:[
				{ resources:'/resource', permissions:'get'}			
			]		
		})
		
		expect(acl.list).to.include.keys('role');		
		expect(acl.list['role']).to.include.keys('/resource');		
		expect(acl.list['role']['/resource']).to.include('get');
	
		done();
	})	
	
	it('should accept an array of permission strings for an allowance', function(done){
	
		acl.allow({
			roles:['role'], 
			allows:[
				{ resources:'/resource', permissions:['get','post']}			
			]		
		})
		
		expect(acl.list).to.include.keys('role');		
		expect(acl.list['role']).to.include.keys('/resource');		
		expect(acl.list['role']['/resource']).to.include('get');
		expect(acl.list['role']['/resource']).to.include('post');
	
		done();
	})	
	
	it('should accept an object for an allowance', function(done){
	
		acl.allow({
			roles:['role'], 
			allows:[
				{ resources:['/resource'], permissions:['get']}			
			]		
		})
		
		expect(acl.list).to.include.keys('role');
		
		expect(acl.list['role']).to.include.keys('/resource');
		
		expect(acl.list['role']['/resource']).to.include('get');
	
		done();
	})	
	
	it('should accept an array of allowance objects', function(done){
	
		acl.allow([
			{
				roles:['role1'], 
				allows:[
					{ resources:['/resource1'], permissions:['get']}			
				]		
			},{
				roles:['role2'], 
				allows:[
					{ resources:['/resource2'], permissions:['put']}			
				]		
			}
		])
		
		expect(acl.list).to.include.keys('role1');		
		expect(acl.list['role1']).to.include.keys('/resource1');		
		expect(acl.list['role1']['/resource1']).to.include('get');
	
		expect(acl.list).to.include.keys('role2');		
		expect(acl.list['role2']).to.include.keys('/resource2');		
		expect(acl.list['role2']['/resource2']).to.include('put');
	
		done();
	
	})
	
	it('should accumulate permission allowances for a role', function(done){
	
		acl.allow([
			{
				roles:['role1'], 
				allows:[
					{ resources:['/resource1'], permissions:['get']}			
				]		
			}
		])
		
		acl.allow([
			{
				roles:['role1'], 
				allows:[
					{ resources:['/resource1'], permissions:['post']}			
				]		
			}
		])
		
		expect(acl.list).to.include.keys('role1');		
		expect(acl.list['role1']).to.include.keys('/resource1');		
		expect(acl.list['role1']['/resource1']).to.include('get');
		expect(acl.list['role1']['/resource1']).to.include('post');
	
		done();
	
	})
	
	it('should accumulate resource allowances for a role', function(done){
	
		acl.allow([
			{
				roles:['role1'], 
				allows:[
					{ resources:['/resource1'], permissions:['get']}			
				]		
			}
		])
		
		acl.allow([
			{
				roles:['role1'], 
				allows:[
					{ resources:['/resource2'], permissions:['post']}			
				]		
			}
		])
		
		expect(acl.list).to.include.keys('role1');		
		expect(acl.list['role1']).to.include.keys('/resource1');		
		expect(acl.list['role1']['/resource1']).to.include('get');
		expect(acl.list['role1']['/resource2']).to.include('post');
	
		done();
	
	})
	
})