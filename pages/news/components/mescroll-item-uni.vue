<template>
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" height="100%" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<list :list="dataList"></list>
	</mescroll-uni>
</template>

<script>
var api = require('@/common/js/news.api.js');

// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
// 引入mescroll-body组件
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue';

import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js';
import List from './list.vue';

export default {
	name: 'qs-mescroll-item',
	mixins: [MescrollMixin, MescrollMoreItemMixin], // 使用mixin
	components: {
		List
	},
	props: {
		category: {
			type: String,
			default: ''
		},
		tag: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			downOption: {
				auto: false
			},
			upOption: {
				auto: true,
				textNoMore: '-- 没有更多了 --',
				empty: {
					tip: '暂无相关信息'
				}
			},
			page: {
				index: 1,
				size: 10
			},
			dataList: []
		};
	},
	methods: {
		/* 下拉刷新的回调 */
		downCallback() {
			// 下拉刷新的回调, 默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			this.mescroll.resetUpScroll();
		},
		/* 上拉加载的回调 */
		upCallback(page) {
			let params = {
				keyword: '',
				categoryId: this.category,
				status: '',
				tag: this.tag,
				sort: ['_id', 'desc'],
				page: {
					index: parseInt(page.num),
					size: parseInt(page.size)
				}
			};
			// 联网加载数据
			api.list(params)
				.then(res => {
					console.log(res);
					let curPageData = res.data.rows;

					// 联网成功的回调，隐藏下拉刷新和上拉加载的状态
					this.mescroll.endSuccess(curPageData.length);

					// 设置列表数据
					if (page.num == 1) this.dataList = []; // 如果是第一页需手动制空列表

					// 追加新数据
					this.dataList = this.dataList.concat(curPageData);
				})
				.catch(err => {
					console.log(err);
					// 联网失败, 结束加载
					this.mescroll.endErr();
				});
		},
		//点击空布局按钮的回调
		emptyClick() {
			uni.showToast({
				title: '点击了按钮'
			});
		}
	}
};
</script>

<style lang="scss" scoped></style>
