const {
	getType
} = require('./utils')
const buildDbCommand = require('./build-db-command.js')
const db = uniCloud.database()

module.exports = function({
	command,
	rules,
	options
}) {
	const collection = command.$db.find(stage => stage.$method === 'collection').$param[0]

	if (!rules[collection]) {
		throw new Error(`集合${collection}禁止访问`)
	}

	const rule = Object.assign({
		create: false,
		read: true,
		update: false,
		delete: false,
		aggregate: false,
		lookup: false,
		blockedField: null,
		hooks: {}
	}, rules[collection])

	if (!command || !command.$db || getType(command.$db) !== 'array') {
		throw new Error('command不正确，请检查传参是否有误')
	}

	const methodList = command.$db.map(stage => stage.$method)

	const useAggregate = methodList.indexOf('aggregate') > -1
	if (useAggregate && !rule.aggregate) {
		throw new Error('云端已禁止聚合操作')
	}

	const useLookup = methodList.indexOf('lookup') > -1
	if (useLookup && !rule.lookup) {
		throw new Error('云端已禁止联表查询')
	}

	let lastMethod = methodList[methodList.length - 1]
	// set行为不可预期，不知是增还是改，暂时禁用'set'，客户端一般也不会使用set
	const allowedLastMethod = ['get', 'end', 'count', 'add', 'remove', 'update']
	if (allowedLastMethod.indexOf(lastMethod) === -1) {
		throw new Error(`${lastMethod}方法不能作为最后一阶段`)
	}

	const typeList = {
		get: 'read',
		end: 'read',
		count: 'read',
		add: 'create',
		remove: 'delete',
		update: 'update',
	}
	const type = typeList[lastMethod]

	const state = {
		useAggregate,
		useLookup,
		type,
		collection,
		methodList
	}

	if (!rule[type]) {
		throw new Error(`${type}权限未开启`)
	}

	const hasHooks = rule && rule.hooks,
		hasBeforeStageAppend = hasHooks && getType(rule.hooks.beforeStageAppend) === 'function',
		hasAfterStageAppend = hasHooks && getType(rule.hooks.afterStageAppend) === 'function',
		hasBeforeSend = hasHooks && getType(rule.hooks.beforeSend) === 'function'

	let fieldArgs
	if (rule.blockedField) {
		fieldArgs = {}
		rule.blockedField.map((item) => {
			fieldArgs[item] = false
		})
	}

	const useWhere = methodList.indexOf('where') > -1

	let exec = db
	command.$db.forEach((stage, index) => {
		let method = stage.$method,
			args = buildDbCommand(stage.$param)

		// lookup外联集合也要受读取规则限制
		if (method === 'lookup') {
			if (!(args && args[0] && args[0].from)) {
				throw new Error('lookup缺少参数from')
			}
			const lookupCol = args[0].from
			const lookupColRule = rules[lookupCol]
			if (!lookupColRule || !lookupColRule.read) {
				throw new Error(`lookup外联集合${lookupCol}不可读取`)
			}
		}

		if (hasBeforeStageAppend) {
			const tempExec = rule.hooks.beforeStageAppend({
				state,
				stage: {
					method,
					args
				},
				exec
			})
			if (tempExec) {
				exec = tempExec
			}
		}

		// 最终阶段添加之前
		if (lastMethod === method) {
			// 不使用聚合时在最终阶段之前添加field屏蔽字段，会覆盖客户端的field
			if (!useAggregate && fieldArgs) {
				exec = exec.field(fieldArgs)
			}
			if (hasBeforeSend) {
				const tempExec = rule.hooks.beforeSend({
					state,
					stage: {
						method,
						args
					},
					exec
				})
				if (tempExec) {
					exec = tempExec
				}
			}
		}

		// 非聚合有where时，修改where条件，插入mixinCondition
		if (method === 'where' && rule.mixinCondition) {
			args[0] = db.command.and(args[0], rule.mixinCondition)
		}
		
		exec = exec[method](...args)

		// 非聚合且客户端并没有使用where的情况下，在collection之后插入where使用mixinCondition作为条件
		if (!useAggregate && !useWhere && method === 'collection' && rule.mixinCondition) {
			exec = exec.where(rule.mixinCondition)
		}

		if (method === 'aggregate') {
			// 使用聚合时在aggregate方法后插入mixinCondition
			if (rule.mixinCondition) {
				exec = exec.match(rule.mixinCondition)
			}
			// 使用聚合时，在aggregate之后添加project屏蔽字段，不会覆盖客户端的project
			if (fieldArgs) {
				exec = exec.project(fieldArgs)
			}
		}

		if (hasAfterStageAppend) {
			const tempExec = rule.hooks.afterStageAppend({
				state,
				stage: {
					method,
					args
				},
				exec
			})
			if (tempExec) {
				exec = tempExec
			}
		}

	})
	return exec
}
