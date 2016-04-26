# node-oauth-error

> Convert oauth object-literal errors into actual Error() objects. 

[![Build Status](https://travis-ci.org/radiovisual/node-oauth-error.svg?branch=master)](https://travis-ci.org/radiovisual/node-oauth-error) [![Coverage Status](https://coveralls.io/repos/github/radiovisual/node-oauth-error/badge.svg?branch=master)](https://coveralls.io/github/radiovisual/node-oauth-error?branch=master)


## Why? 

For some reason, the popular [oauth](https://github.com/ciaranj/node-oauth) module returns object literals instead of Error() objects,
so this module simply converts node-oauth object-literal errors into actual Error() objects. *See oauth [#250](https://github.com/ciaranj/node-oauth/issues/250), [#84](https://github.com/ciaranj/node-oauth/pull/84), and [#155](https://github.com/ciaranj/node-oauth/pull/155)* 


## Contribute

This module is in the very beginning stages of development. I made it to satisfy a need in a specific project,
but I would love to see this module grow to its full potential. Please test this module in your projects and open issues
or send pull requests if you would like to extend/improve its functionality. :smile:


## Install

Assuming you have [oauth](https://github.com/ciaranj/node-oauth) installed, now install node-oauth-error:
```
$ npm install --save node-oauth-error
```


## Usage

```js
const OAuth = require('oauth');
const OAuthError = require('node-oauth-error');

oauth.get(`some/url/endpoint`,
    credentials.accessToken,
    credentials.accessTokenSecret,
    (err, data) => {
        if (err) {
            // convert the oauth error into a real `Error()`.
		    throw new OAuthError(err);			
		}
		// ...
	}
);
```

## Notes


## API

### throw new OAuthError(input)

#### input

*Required*  
Type: `object`

The original [oauth](https://github.com/ciaranj/node-oauth) error object literal you want to convert to an actual Error. 



## License

MIT © [Michael Wuergler](http://numetriclabs.com)
