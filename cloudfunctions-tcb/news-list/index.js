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

	// 查询条件
	let objWhere = {
		_id: dbCmd.neq('')
	}
	if (event.type == 0) {
		objWhere = {
			tag: dbCmd.eq('关注')
		}
	}
	if (event.type == 2) {
		objWhere = {
			tag: dbCmd.eq('热榜')
		}
	}
	if (event.type == 3) {
		objWhere = {
			tag: dbCmd.eq('精读')
		}
	}
	if (event.type == 4) {
		objWhere = {
			tag: dbCmd.eq('直播')
		}
	}
	if (event.type == 5) {
		objWhere = {
			category: dbCmd.eq('fcca363a5ef715df0005cd13300816c6')
		}
	}

	// 获取总数
	let total = await collection.where(objWhere).count();

	res = await collection.where(objWhere).skip((page - 1) * limit).limit(limit).orderBy(...order).get();
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
