# qs-unicloud-news

`qs-news`为`uniCloud`开发者提供了简单、统一、可扩展的资讯模块云函数类插件，支持阿里云、腾讯云。

`qs-news`作为云函数公用模块，封装了资讯、分类、标签等常见功能，以 API 方式调用，开发者将`qs-news`作为公用模块导入后，可在云函数中便捷调用。

对于`qs-news`还未封装的能力，欢迎大家在开源项目上提交 pr，共同完善这个开源项目。

## 打包

执行以下命令：

```npm
npm install
npm run lint
npm run build
```

## 使用方式

### 创建公用模块
1. 在`cloudfunctions`目录下创建`common`目录
2. 在`common`目录右键创建公用模块目录`qs-news`，会自动创建入口`index.js`文件和`package.json`，不要修改此`package.json`的`name`字段
3. 在`qs-news`右键上传公用模块

### 引入公用模块
1. 在要引入公用模块的云函数目录`news`执行`npm init -y`生成`package.json`文件
2. 在`news`目录执行`npm install ../common/qs-news`引入`qs-news`模块
3. 在云函数中调用，示例代码：

```js
'use strict';

const qsNews = require('qs-news')

exports.main = async (event, context) => {
	// event为客户端上传的参数
	console.log('event : ' + event)

	// 操作
	let action = event.action
	// 参数
	let params = event.params || {}
	// 返回
	let res = {}

	switch (action) {
		case 'newsList':
			res = await qsNews.newsList(params);
			break;
		case 'newsDetail':
			res = await qsNews.newsDetail(params);
			break;
		case 'newsAdd':
			res = await qsNews.newsAdd(params);
			break;
		case 'newsUpdate':
			res = await qsNews.newsUpdate(params);
			break;
		case 'newsDelete':
			res = await qsNews.newsDelete(params);
			break;
		case 'newsEmpty':
			res = await qsNews.newsEmpty();
			break;
		default:
			res = {
				code: 403,
				msg: '非法访问'
			}
			break;
	}

	// 返回数据给客户端
	return res
};

```
