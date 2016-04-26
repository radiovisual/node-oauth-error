// import test from 'ava';
var assert = require('assert');
var util = require('util');
// import oauth from 'node-oauth';
var OauthError = require('../index.js');

function whoops1() {
	var sampleError = {
		statusCode: 401,
		data: '{"request": "\\/1.1\\/statuses\\/user_timeline.json", "error": "Not authorized."}'
	};
	throw new OauthError(sampleError);
}

function whoops2() {
	var sampleError = {
		statusCode: 401,
		data: '{"errors": [{"code":89, "message": "Invalid or expired token."}]}'
	};
	throw new OauthError(sampleError);
}

function whoops3() {
	var sampleError = {statusCode: 401};
	throw new OauthError(sampleError);
}

try {
	whoops1();
} catch (err) {
	assert(err.name = 'OauthError');
	assert(err instanceof OauthError);
	assert(err instanceof Error);
	assert(util.isError(err));
	assert(err.stack);
	assert.strictEqual(err.toString(), 'OauthError: Not authorized.');
	assert.strictEqual(err.stack.split('\n')[0], 'OauthError: Not authorized.');
	assert.strictEqual(err.stack.split('\n')[1].indexOf('whoops1'), 7);
	assert.strictEqual(err.statusCode, 401);
	assert.strictEqual(err.url, '/1.1/statuses/user_timeline.json');
}

try {
	whoops2();
} catch (err) {
	assert(err.name = 'OauthError');
	assert(err instanceof OauthError);
	assert(err instanceof Error);
	assert(util.isError(err));
	assert(err.stack);
	assert.strictEqual(err.toString(), 'OauthError: Invalid or expired token.');
	assert.strictEqual(err.stack.split('\n')[0], 'OauthError: Invalid or expired token.');
	assert.strictEqual(err.stack.split('\n')[1].indexOf('whoops2'), 7);
	assert.strictEqual(err.statusCode, 401);
	assert.strictEqual(err.url, '');
}

// Unspecified message when no message is present
try {
	whoops3();
} catch (err) {
	assert.strictEqual(err.message, 'unspecified OauthError.');
}

