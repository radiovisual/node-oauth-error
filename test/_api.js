var assert = require('assert');
var util = require('util');

var OAuthError = require('../index.js');

function whoops1() {
	var sampleError = {
		statusCode: 401,
		data: '{"request": "\\/1.1\\/statuses\\/user_timeline.json", "error": "Not authorized."}'
	};
	throw new OAuthError(sampleError);
}

function whoops2() {
	var sampleError = {
		statusCode: 401,
		data: '{"errors": [{"code":89, "message": "Invalid or expired token."}]}'
	};
	throw new OAuthError(sampleError);
}

function whoops3() {
	var sampleError = {statusCode: 401};
	throw new OAuthError(sampleError);
}

try {
	whoops1();
} catch (err) {
	assert(err.name = 'OAuthError');
	assert(err instanceof OAuthError);
	assert(err instanceof Error);
	assert(util.isError(err));
	assert(err.stack);
	assert.strictEqual(err.toString(), 'OAuthError: Not authorized.');
	assert.strictEqual(err.stack.split('\n')[0], 'OAuthError: Not authorized.');
	assert.strictEqual(err.stack.split('\n')[1].indexOf('whoops1'), 7);
	assert.strictEqual(err.statusCode, 401);
	assert.strictEqual(err.url, '/1.1/statuses/user_timeline.json');
}

try {
	whoops2();
} catch (err) {
	assert(err.name = 'OAuthError');
	assert(err instanceof OAuthError);
	assert(err instanceof Error);
	assert(util.isError(err));
	assert(err.stack);
	assert.strictEqual(err.toString(), 'OAuthError: Invalid or expired token.');
	assert.strictEqual(err.stack.split('\n')[0], 'OAuthError: Invalid or expired token.');
	assert.strictEqual(err.stack.split('\n')[1].indexOf('whoops2'), 7);
	assert.strictEqual(err.statusCode, 401);
	assert.strictEqual(err.url, '');
}

// Unspecified message when no message is present
try {
	whoops3();
} catch (err) {
	assert.strictEqual(err.message, 'unspecified OAuthError.');
}

