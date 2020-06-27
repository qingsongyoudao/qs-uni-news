'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	// event为客户端上传的参数
	console.log('event : ' + event)

	// 数据表
	const collection = db.collection('news')

	// 对象
	let model = event
	// 返回
	let res = {}
	// 数据
	let data = {}

	// 分页
	let page = model.page.index
	let limit = model.page.size
	if (page < 1) {
		page = 1
	}
	if (limit < 1) {
		limit = 10
	}
	// 排序
	let order = ["_id", "desc"]

	// 获取公告总数
	let total = await collection.where({
		_id: dbCmd.neq('')
	}).count();

	res = await collection.skip((page - 1) * limit).limit(limit).orderBy(...order).get();
	data = res.data

	// 返回数据给客户端
	return {
		"code": 0,
		"msg": "成功",
		"data": {
			"total": total.total,
			"rows": data
		}
	}
};
