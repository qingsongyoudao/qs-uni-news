'use strict';

const qsNews = require('qs-news')

exports.main = async (event, context) => {
	// event为客户端上传的参数
	console.log('event : ' + event)

	// 操作
	let action = event.action
	// 参数
	let params = event.params || {}
	// 返回
	let res = {}

	switch (action) {
		case 'list':
			res = await qsNews.newsList(params);
			break;
		case 'detail':
			res = await qsNews.newsDetail(params);
			break;
		case 'add':
			res = await qsNews.newsAdd(params);
			break;
		case 'update':
			res = await qsNews.newsUpdate(params);
			break;
		case 'delete':
			res = await qsNews.newsDelete(params);
			break;
		case 'empty':
			res = await qsNews.newsEmpty();
			break;
		case 'categoryList':
			res = await qsNews.newsCategoryList(params);
			break;
		case 'categoryDetail':
			res = await qsNews.newsCategoryDetail(params);
			break;
		case 'categoryAdd':
			res = await qsNews.newsCategoryAdd(params);
			break;
		case 'categoryUpdate':
			res = await qsNews.newsCategoryUpdate(params);
			break;
		case 'categoryDelete':
			res = await qsNews.newsCategoryDelete(params);
			break;
		case 'categoryEmpty':
			res = await qsNews.newsCategoryEmpty();
			break;
		case 'tagList':
			res = await qsNews.newsTagList(params);
			break;
		case 'tagDetail':
			res = await qsNews.newsTagDetail(params);
			break;
		case 'tagAdd':
			res = await qsNews.newsTagAdd(params);
			break;
		case 'tagUpdate':
			res = await qsNews.newsTagUpdate(params);
			break;
		case 'tagDelete':
			res = await qsNews.newsTagDelete(params);
			break;
		case 'tagEmpty':
			res = await qsNews.newsTagEmpty();
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
