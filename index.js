'use strict';
/**
 * Convert the given object-literal error into an Error() object.
 *
 *   Note: node-oauth returns objects that look like one of the following:
 *
 *   Format #1:
 *		{
 *	   	  statusCode: 401,
 *		  data: '{"request": "\\/1.1\\/statuses\\/user_timeline.json", "error": "Not authorized."}'
 *  	}
 *
 *   Format #2:
 *     {
 *		 statusCode: 401,
 *		 data: '{"errors": [{"code":89, "message": "Invalid or expired token."}]}'
 *	   }
 *
 * @param {object} obj - the node-oauth object you want to convert
 */
module.exports = function OauthError(obj) {
	// Safeguard against environments that might not have Error.captureStackTrace
	if (Error.captureStackTrace) {
		Error.captureStackTrace(this, this.constructor);
	}

	obj.data = obj.data || {};
	if (typeof obj.data === 'string') {
		obj.data = JSON.parse(obj.data);
	}

	this.name = this.constructor.name;
	this.message = message(obj);
	this.statusCode = obj.statusCode;
	this.url = obj.data.request ? obj.data.request : '';
};

function message(obj) {
	if (obj.data.error) {
		return obj.data.error;
	}
	if (obj.data.errors) {
		if (Array.isArray(obj.data.errors) && obj.data.errors[0].message) {
			return obj.data.errors[0].message;
		}
	}
	return 'unspecified OauthError.';
}

require('util').inherits(module.exports, Error);
