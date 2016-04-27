# node-oauth-error

> Convert oauth object-literal errors into actual Error() objects. 

[![Build Status](https://travis-ci.org/radiovisual/node-oauth-error.svg?branch=master)](https://travis-ci.org/radiovisual/node-oauth-error) [![Coverage Status](https://coveralls.io/repos/github/radiovisual/node-oauth-error/badge.svg?branch=master)](https://coveralls.io/github/radiovisual/node-oauth-error?branch=master)


## Why? 

For some reason, the popular [oauth](https://github.com/ciaranj/node-oauth) module returns object literals instead of `Error()` objects,
so this module simply converts oauth object-literal errors into actual `Error()` objects. *See oauth [#250](https://github.com/ciaranj/node-oauth/issues/250), [#84](https://github.com/ciaranj/node-oauth/pull/84), and [#155](https://github.com/ciaranj/node-oauth/pull/155).* 


## Contribute

Please test this module in your projects and open issues or send pull requests if you would like to improve, extend or
fix anything in this module. :smile:


## Install

Assuming you have [oauth](https://github.com/ciaranj/node-oauth) installed, now install node-oauth-error:
```
$ npm install --save node-oauth-error
```


## Usage

```js
const oauth = require('oauth');
const OAuthError = require('node-oauth-error');

oauth.get('some/url/endpoint',
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

This module knows how to convert oauth errors that have the following formats:

Format #1:
```js
{
    statusCode: 401,
    data: '{"request": "\\/1.1\\/statuses\\/user_timeline.json", "error": "Not authorized."}'
}
```

Format #2:
```js
{
    statusCode: 401,
    data: '{"errors": [{"code":89, "message": "Invalid or expired token."}]}'
}
```

If you see something I am missing, please open an issue or send a pull request. *Thanks!*


## API

### OAuthError(input)

The Error constructor.

#### input

*Required*  
Type: `object`

The original [oauth](https://github.com/ciaranj/node-oauth) error object literal you want to convert to an actual Error. 


## License

MIT © [Michael Wuergler](http://numetriclabs.com)
