# node-oauth-error

> Convert node-oauth object-literal errors into actual Error() objects. 

[![Build Status](https://travis-ci.org/radiovisual/node-oauth-error.svg?branch=master)](https://travis-ci.org/radiovisual/node-oauth-error) [![Coverage Status](https://coveralls.io/repos/github/radiovisual/node-oauth-error/badge.svg?branch=master)](https://coveralls.io/github/radiovisual/node-oauth-error?branch=master)


## Why? 
For some reason, the popular [node-oauth](https://github.com/ciaranj/node-oauth) module returns object literals instead of Error() objects,
so this module simply converts node-oauth object-literal errors into actual Error() objects. *See node-oauth [#250](https://github.com/ciaranj/node-oauth/issues/250), [#84](https://github.com/ciaranj/node-oauth/pull/84), and [#155](https://github.com/ciaranj/node-oauth/pull/155)* 

## Install

Assuming you have [node-oauth](https://github.com/ciaranj/node-oauth) installed, now install node-oauth-error:
```
$ npm install --save node-oauth-error
```


## Usage

```js
const oauth = require('node-oauth');
const OauthError = require('node-oauth-error');

oauth.get(`some/url/endpoint`,
    credentials.accessToken,
    credentials.accessTokenSecret,
    (err, data) => {
        if (err) {
		    throw new OauthError(err);			
		}
		console.log(data);
	}
);
```


## API

### throw new NodeOauthError(input)

#### input

*Required*  
Type: `object`

The original [node-oauth](https://github.com/ciaranj/node-oauth) error object literal you want to convert to an actual Error. 



## License

MIT © [Michael Wuergler](http://numetriclabs.com)
