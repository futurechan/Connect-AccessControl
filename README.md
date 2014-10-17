An access control list middleware
===================

Inspired by [acl](https://github.com/OptimalBits/node_acl "node_acl")

##Status

[![BuildStatus](https://secure.travis-ci.org/futurechan/Connect-Acl.png?branch=master)](https://travis-ci.org/futurechan/Connect-Acl)


##Installation

Using npm:

```javascript
npm install connect-acl
```

##Documentation

* [allow](#allow)
* [check](#check)
* [middleware](#middleware)

##Examples

```javascript
var Acl = require('connect-acl')    
    , acl = new Acl()
;
```

<a name="allow"/>
### allow()
```javascript
acl.allow([
	{
		roles:['someRole'], 
		allows:[
			{resources:'/resource1', permissions:['get', 'post']},
			{resources:'/resource1/:id', permissions:['get', 'put']}
		]
	}
])
```

<a name="check"/>
### check()
```javascript
acl.check(roles, resource, permission)
roles { string | array of strings }

```

<a name="middleware"/>
### allow()
```javascript
app.use(acl.middleware(opts));

```
__Options__
```javascript
    roleProvider              {function} /* defaults to function(req){ return req.user.roles;}                      */
	resourceProvider       {function} /* defaults to function(req){ return req.route.path;}                     */
	permissionProvider    {funciton} /* defaults to function(req){ return req.method.toLowerCase();}   */
```
