'use strict';

const qsNews = require('qs-news')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)

	// 操作
	let action = event.action
	// 参数
	let params = event.params
	// 返回
	let res = {}

	switch (action) {
		case 'category':
			res = await qsNews.newsList(params);
			break;
		default:
			res = {
				code: 403,
				msg: '非法访问'
			}
			break;
	}

	// 返回数据给客户端
	return res
};
