'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	// event为客户端上传的参数
	console.log('event : ' + event)

	// 数据表
	const collection = db.collection('category')

	// 对象
	let model = event
	// 返回
	let res = {}
	// 数据
	let data = {}

	res = await collection.doc(model.id).update(model)
	data = res
	
	// 返回数据给客户端
	return {
		"code": 0,
		"msg": "成功",
		"data": data
	}
};
