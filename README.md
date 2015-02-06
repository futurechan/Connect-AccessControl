An access control list middleware
===================

Inspired by [acl](https://github.com/OptimalBits/node_acl "node_acl")

##Status

[![BuildStatus](https://secure.travis-ci.org/futurechan/Connect-AccessControl.png?branch=master)](https://travis-ci.org/futurechan/Connect-AccessControl) [![DependencyStatus](https://david-dm.org/futurechan/Connect-AccessControl.png?branch=master)](https://david-dm.org/futurechan/Connect-AccessControl.png?branch=master)


##Installation

Using npm:

```javascript
npm install connect-accesscontrol
```

##Documentation

* [allow](#allow)
* [check](#check)
* [middleware](#middleware)

##Examples

```javascript
var Acl = require('connect-accesscontrol')
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
      { resources:'/resource1', permissions:'get' },
      { resources:'/resource2', permissions:['get', 'post', 'put'] },
      { resources:'/resource3', permissions:'*' }
    ]
  }
])
```
Permissions can be a single verb, an array of verbs. If you want to grant any action to a role, you can use '*'.

Regular expression are also supported
```javascript
acl.allow([
  {
    roles:['someRole'], 
    allows:[
      { resources:'/resource1(/[0-9]+)?', permissions:['get', 'post', 'put'] },
      { resources:'/resource2(/[0-9]+)?', permissions:['get', 'post', 'put'] }
    ]
  }
])
```
Do not include ```^``` and ```$```. Those will be added for you.

You can also omit access to the parent resource while allowing access to the subresource
```javascript
acl.allow([
  {
    roles:['someOtherRole'], 
    allows:[
      {resources:'/resource/[0-9]+/subresource/[0-9]+', permissions:['get', 'post', 'put']}
    ]
  }
])
```

<a name="check"/>
### check()
```javascript
acl.check(roles, resource, permission)
  roles      { String | Array }
  resource   { String }
  permission { String }

```

<a name="middleware"/>
### middleware()
```javascript
app.use(acl.middleware(opts));

```
__Options__
```javascript
  roleProvider          { Function } /* defaults to function(req){ return req.user.roles;}             */
  resourceProvider      { Function } /* defaults to function(req){ return req.url;}                    */
  permissionProvider    { Function } /* defaults to function(req){ return req.method.toLowerCase();}   */
```
