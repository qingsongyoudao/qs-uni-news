const {
	getType
} = require('./utils.js')
const db = uniCloud.database()
module.exports = function buildDbCommand(param) {
	switch (getType(param)) {
		case 'object':
			switch (true) {
				case !!param.$db:
					let stages = db
					for (var i = 0; i < param.$db.length; i++) {
						const item = param.$db[i]
						// $param为数组
						if (item.$param) {
							stages = stages[item.$method](...buildDbCommand(item.$param))
						} else {
							stages = stages[item.$method]
						}
					}
					return stages
				case !!param.$regexp:
					return new RegExp(param['$regexp'].source, param['$regexp'].flags)
				case !!param.$date:
					return new Date(param['$date'])
				default:
					Object.keys(param).map(key => {
						param[key] = buildDbCommand(param[key])
					})
					return param
			}
		case 'array':
			return param.map(item => buildDbCommand(item))
		default:
			return param
	}
}
