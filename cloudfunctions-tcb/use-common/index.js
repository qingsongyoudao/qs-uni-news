'use strict';
const {
	secret,
	getVersion
} = require('hello-common')
exports.main = async (event, context) => {
	let version = getVersion()
	return {
		secret,
		version
	}
}
