export default function(obj) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: obj.url,
			data: {
				action: obj.action,
				params: obj.data
			},
			success(res) {
				console.log(res)
				var data = res.result
				console.log(data)
				resolve(data)
			},
			fail(err) {
				console.error(err)
				reject(new Error('服务器异常，请稍后再试'))
			}
		})
	})
}
