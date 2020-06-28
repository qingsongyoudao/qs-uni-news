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
		case 'list':
			res = await qsNews.newsList(params);
			break;
		case 'detail':
			res = await qsNews.newsDetail(params);
			break;
		case 'delete':
			res = await qsNews.newsDelete(params);
			break;
		case 'add':
			res = await qsNews.newsAdd(params);
			break;
		case 'update':
			res = await qsNews.newsUpdate(params);
			break;
		case 'category-list':
			res = await qsNews.newsCategoryList(params);
			break;
		case 'category-detail':
			res = await qsNews.newsCategoryDetail(params);
			break;
		case 'category-delete':
			res = await qsNews.newsCategoryDelete(params);
			break;
		case 'category-add':
			res = await qsNews.newsCategoryAdd(params);
			break;
		case 'category-update':
			res = await qsNews.newsCategoryUpdate(params);
			break;
		case 'tag-list':
			res = await qsNews.newsTagList(params);
			break;
		case 'tag-detail':
			res = await qsNews.newsTagDetail(params);
			break;
		case 'tag-delete':
			res = await qsNews.newsTagDelete(params);
			break;
		case 'tag-add':
			res = await qsNews.newsTagAdd(params);
			break;
		case 'tag-update':
			res = await qsNews.newsTagUpdate(params);
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
