'use strict';
var OAuthError = require('../../index.js');

/**
 * Uses the oauth error object with the following format
 * (note that the expected 'data' property has been removed:
 *   {
 *     statusCode: 401
 *   }
 */
module.exports = function () {
	var errorSampleNoData = {statusCode: 401};
	throw new OAuthError(errorSampleNoData);
};
