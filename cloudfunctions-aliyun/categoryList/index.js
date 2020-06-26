'use strict';
const db = uniCloud.database
const dbCmd = db.command
exports.main = async (event, context) => {
	const collection = db.collection('category')
	// 获取公告总数
	var total = await collection.where({
		_id: dbCmd.neq('')
	}).count()
	// 获取公告列表
	var start = (event.page - 1) * event.everpagenumber
	var res = await collection.orderBy('date', 'desc').skip(start).limit(event.everpagenumber).get()
	return [total, res]
};
