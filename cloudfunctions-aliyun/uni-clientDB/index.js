'use strict';
const uniCurd = require('uni-curd')
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	try {
		const res = await uniCurd({
			command: event.command,
			pagination: event.pagination,
			rules: {
				list: {
					// CRUD权限
					create: true,
					read: true,
					update: true,
					delete: true,
					// 是否允许使用聚合
					aggregate: true,
					// 是否允许使用联表查询，联表查询时blockedField不会对被连接的集合生效
					lookup: true,
					// 使用聚合时blockField不会覆盖客户端的project，而是在聚合第一阶段插入project，不使用聚合时会在最后阶段插入一个field（会覆盖客户端的field方法）
					blockedField: ['extra'],
					// 不使用聚合时mixinCondition会在没有where的时候在collection方法之后插入where，有where时会跟where条件进行合并，取原条件且mixinCondition。使用聚合时会在第一阶段插入match使用混入的条件，如果有blockedField会插入在blockedField对应的project之前
					// mixinCondition: {
					// 	time: dbCmd.gt(1000000000000)
					// },
					// hooks可以对数据库操作命令进行修改
					hooks: {
						// 每个阶段被添加之前执行
						beforeStageAppend: function({
							state,
							stage,
							exec
						}) {
							// 示例：在end阶段之前插入一个limit
							// if(stage.method === 'get') {
							// 	return exec.limit(1)
							// }
						},
						// 每个阶段被添加之后执行
						afterStageAppend: function({
							state,
							stage,
							exec
						}) {
							// 示例：在skip阶段之后插入一个limit
							// if(stage.method === 'skip') {
							// 	return exec.limit(10)
							// }
						},
						// 最终阶段'get', 'end', 'count', 'add', 'remove', 'update'添加之前执行，在beforeStageAppend之后
						beforeSend: function({
							state,
							stage,
							exec
						}) {
							// 示例：在add时校验参数
							// if (stage.method === 'add') {
							// 	const arg = stage.args[0]
							// 	if (!arg.name) {
							// 		throw new Error('name不可为空')
							// 	}
							// }
						}
					}
				}
			}
		})
		return res

	} catch (e) {
		return {
			code: 10001,
			msg: e.message
		}
	}
};
