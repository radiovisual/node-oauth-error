var assert = require('assert');
var util = require('util');
var OAuth = require('oauth');
var OAuthError = require('../index.js');

var throwFromSample1 = require('./oauth-error-samples/sample01.js');
var throwFromSample2 = require('./oauth-error-samples/sample02.js');
var throwFromNoDataSample = require('./oauth-error-samples/sampleNoDataprop.js');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Test the Error() object returned from the known
// oauth error object sample with: `data.error`
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
try {
	throwFromSample1();
} catch (err) {
	assert(err.name = 'OAuthError');
	assert(err instanceof OAuthError);
	assert(err instanceof Error);
	assert(util.isError(err));
	assert(err.stack);
	assert.strictEqual(err.toString(), 'OAuthError: Not authorized.');
	assert.strictEqual(err.stack.split('\n')[0], 'OAuthError: Not authorized.');
	assert.strictEqual(err.stack.split('\n')[1].indexOf('throw01'), 7);
	assert.strictEqual(err.statusCode, 401);
	assert.strictEqual(err.url, '/1.1/statuses/user_timeline.json');
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Test the Error() object returned from the known
// oauth error object sample with: `data.errors[]`
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
try {
	throwFromSample2();
} catch (err) {
	assert(err.name = 'OAuthError');
	assert(err instanceof OAuthError);
	assert(err instanceof Error);
	assert(util.isError(err));
	assert(err.stack);
	assert.strictEqual(err.toString(), 'OAuthError: Invalid or expired token.');
	assert.strictEqual(err.stack.split('\n')[0], 'OAuthError: Invalid or expired token.');
	assert.strictEqual(err.stack.split('\n')[1].indexOf('throw02'), 7);
	assert.strictEqual(err.statusCode, 401);
	assert.strictEqual(err.url, '');
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Unspecified message when no message data is present
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
try {
	throwFromNoDataSample();
} catch (err) {
	assert.strictEqual(err.message, 'unspecified OAuthError.');
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Actually test the Error output against a real
// oauth (node-oauth) instance using invalid credentials.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	'invalidConsumerKey',
	'invalidConsumerSecret',
	'1.0A',
	null,
	'HMAC-SHA1'
);

oauth.get(
	'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=screenname&include_rts=1&count=200',
	'invalidAccessToken',
	'invalidAccessTokenSecret',
	function (err, data) {
		if (err) {
			try {
				throw new OAuthError(err);
			} catch (err) {
				assert(data);
				assert(err.name = 'OAuthError');
				assert(err instanceof OAuthError);
				assert(err instanceof Error);
				assert(util.isError(err));
				assert(err.stack);
				assert.strictEqual(err.toString(), 'OAuthError: Invalid or expired token.');
				assert.strictEqual(err.stack.split('\n')[0], 'OAuthError: Invalid or expired token.');
				assert.strictEqual(err.statusCode, 401);
				assert.strictEqual(err.url, '');
			}
		}
	}
);
