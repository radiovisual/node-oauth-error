'use strict';
var OAuthError = require('../../index.js');

/**
 * Uses the oauth error object with the following format:
 *   {
 *	   statusCode: 401,
 *	   data: '{"request": "\\/1.1\\/statuses\\/user_timeline.json", "error": "Not authorized."}'
 *   }
 */
module.exports = function throw01() {
	var errorSample = {
		statusCode: 401,
		data: '{"request": "\\/1.1\\/statuses\\/user_timeline.json", "error": "Not authorized."}'
	};
	throw new OAuthError(errorSample);
};
