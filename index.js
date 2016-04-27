'use strict';
/**
 * Convert the given oauth object-literal error into a real Error() object.
 * @param {object} obj - the original oauth error object you want to convert
 */
module.exports = function OAuthError(obj) {
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
	return 'unspecified OAuthError.';
}

// Inherit from node's `Error` object
require('util').inherits(module.exports, Error);

