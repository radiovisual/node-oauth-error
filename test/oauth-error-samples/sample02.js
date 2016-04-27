'use strict';
var OAuthError = require('../../index.js');

/**
 * Uses the oauth error object with the following format:
 *   {
 *     statusCode: 401,
 *     data: '{"errors": [{"code":89, "message": "Invalid or expired token."}]}'
 *   }
 */
module.exports = function throw02() {
	var errorSample = {
		statusCode: 401,
		data: '{"errors": [{"code":89, "message": "Invalid or expired token."}]}'
	};
	throw new OAuthError(errorSample);
};

