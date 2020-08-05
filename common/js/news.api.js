import request from '@/common/js/request.js'
var url = 'news'

module.exports = {
	list(data) {
		return request({
			url,
			action: 'list',
			data
		})
	},
	detail(data) {
		return request({
			url,
			action: 'detail',
			data
		})
	},
	add(data) {
		return request({
			url,
			action: 'add',
			data
		})
	},
	update(data) {
		return request({
			url,
			action: 'update',
			data
		})
	},
	delete(data) {
		return request({
			url,
			action: 'delete',
			data
		})
	},
	empty(data) {
		return request({
			url,
			action: 'empty',
			data
		})
	},
	// 类别
	categoryList(data) {
		return request({
			url,
			action: 'categoryList',
			data
		})
	},
	categoryDetail(data) {
		return request({
			url,
			action: 'categoryDetail',
			data
		})
	},
	categoryAdd(data) {
		return request({
			url,
			action: 'categoryAdd',
			data
		})
	},
	categoryUpdate(data) {
		return request({
			url,
			action: 'categoryUpdate',
			data
		})
	},
	categoryDelete(data) {
		return request({
			url,
			action: 'categoryDelete',
			data
		})
	},
	categoryEmpty(data) {
		return request({
			url,
			action: 'categoryEmpty',
			data
		})
	},
	// 标签
	tagList(data) {
		return request({
			url,
			action: 'tagList',
			data
		})
	},
	tagDetail(data) {
		return request({
			url,
			action: 'tagDetail',
			data
		})
	},
	tagAdd(data) {
		return request({
			url,
			action: 'tagAdd',
			data
		})
	},
	tagUpdate(data) {
		return request({
			url,
			action: 'tagUpdate',
			data
		})
	},
	tagDelete(data) {
		return request({
			url,
			action: 'tagDelete',
			data
		})
	},
	tagEmpty(data) {
		return request({
			url,
			action: 'tagEmpty',
			data
		})
	}
}
