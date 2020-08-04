const runDbCommand = require('./run-db-command.js')

module.exports = async ({
	command,
	rules,
	pagination
}) => {
	if (!command || !command.$db) {
		throw new Error('command不正确，请检查传参是否有误')
	}

	if (Object.keys(rules).some(col => rules[col].lookup)) {
		console.warn('请注意开启lookup之后无法限制外联集合的字段返回，即blockedField不对外联集合生效')
	}

	if (pagination) {
		if (typeof pagination.pageSize !== 'number') {
			throw new Error('pagination.pageSize需为number类型')
		}
		if (typeof pagination.current !== 'number') {
			throw new Error('pagination.current需为number类型')
		}
		let tempCommand = {
				$db: []
			},
			total, list
		const useAggregate = command.$db.some(stage => stage.$method === 'aggregate')
		if (useAggregate) {
			// 使用聚合时自动补充count().end()
			tempCommand.$db = command.$db.concat([{
					$method: 'count',
					$param: ['total']
				},
				{
					$method: 'end',
					$param: []
				}
			])
		} else {
			// 不使用聚合时自动补充count()
			tempCommand.$db = command.$db.concat([{
				$method: 'count',
				$param: []
			}])
		}
		const countRes = await runDbCommand({
			command: tempCommand,
			rules,
		})

		if (useAggregate) {
			total = countRes.data[0] && countRes.data[0].total || 0
			// 使用聚合时自动补充skip().limit().end()
			tempCommand.$db = command.$db.concat([{
					$method: 'skip',
					$param: [pagination.current * pagination.pageSize]
				}, {
					$method: 'limit',
					$param: [pagination.pageSize]
				},
				{
					$method: 'end',
					$param: []
				}
			])
		} else {
			total = countRes.total
			// 不使用聚合时自动补充skip().limit().get()
			tempCommand.$db = command.$db.concat([{
					$method: 'skip',
					$param: [pagination.current * pagination.pageSize]
				}, {
					$method: 'limit',
					$param: [pagination.pageSize]
				},
				{
					$method: 'get',
					$param: []
				}
			])
		}
		const listRes = await runDbCommand({
			command: tempCommand,
			rules,
		})
		list = listRes.data
		return {
			total,
			list
		}
	}
	return await runDbCommand({
		command,
		rules,
	})
}
