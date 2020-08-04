import parser from './parser.js'
class Stage {
	constructor(content, prevStage) {
		this.content = content
		this.prevStage = prevStage
	}
	toJSON() {
		let tempStage = this
		const stages = [tempStage.content]
		while (tempStage.prevStage) {
			tempStage = tempStage.prevStage
			stages.push(tempStage.content)
		} 
		return {
			$db: stages.reverse().map((item) => {
				return {
					$method: item.$method,
					$param: item.$param
				}
			})
		}
	}
}

const propList = ['db.Geo', 'db.command', 'command.aggregate']

function isProp(prev, key) {
	return propList.indexOf(`${prev}.${key}`) > -1
}

function getDbIns(content, prevStage) {
	const stage = new Stage(content, prevStage)
	return new Proxy(stage, {
		get(stage, key, rec) {
			if (Object.prototype.hasOwnProperty.call(stage, key) || stage[key] || typeof key !== 'string') {
				return stage[key]
			}
			let prevMethod = 'db'
			if (rec && rec.content) {
				prevMethod = rec.content.$method
			}
			if (isProp(prevMethod, key)) {
				return getDbIns({
					$method: key
				}, rec)
			}
			return function() {
				return getDbIns({
					$method: key,
					$param: parser(Array.from(arguments))
				}, rec)
			}
		}
	})
}


export default new Proxy({}, {
	get(db, key, rec) {
		if (isProp('db', key)) {
			return getDbIns({
				$method: key
			})
		}
		return function() {
			return getDbIns({
				$method: key,
				$param: parser(Array.from(arguments))
			})
		}

	}
})
