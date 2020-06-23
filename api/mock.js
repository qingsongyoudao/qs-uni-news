// 模拟数据
import newsList from "./news-list.js";

// 获取新闻列表
export function apiNewList(pageNum, pageSize) {
	return new Promise((resolute, reject) => {
		// 延时一秒,模拟联网
		setTimeout(function() {
			try {
				// 数据
				let data = newsList;
				let list = [];
				if (!pageNum) {
					// 下拉刷新返回的数据
					let id = new Date().getTime();
					let newObj = {
						id: id,
						imageUrl: "",
						title: "苹果 iOS 14/iPadOS 14 开发者预览/公测版 Beta 开始推送 " + id,
						date: '2020-06-23 21:06',
						comment: 128
					};
					list.push(newObj);
				} else {
					// 上拉加载返回的数据
					for (let i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
						if (i == data.length) break;
						list.push(data[i]);
					}
				}
				//模拟接口请求成功
				resolute(list);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		}, 1000)
	})
}
