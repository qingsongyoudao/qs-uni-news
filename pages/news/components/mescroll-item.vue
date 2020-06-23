<template>
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" height="100%" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<list :list="dataList"></list>
	</mescroll-uni>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js';
import List from './list.vue';
import { apiNewList } from '@/api/mock.js';

export default {
	name: 'qs-mescroll-item',
	mixins: [MescrollMixin, MescrollMoreItemMixin],
	components: {
		List
	},
	props: {
		tabs: Array
	},
	data() {
		return {
			downOption: {
				auto: false
			},
			upOption: {
				auto: true
			},
			dataList: []
		};
	},
	methods: {
		/* 下拉刷新的回调 */
		downCallback() {
			// 联网加载数据
			apiNewList()
				.then(data => {
					// 联网成功的回调, 隐藏下拉刷新的状态
					this.mescroll.endSuccess();
					// 设置列表数据
					this.dataList.unshift(data[0]);
				})
				.catch(() => {
					// 联网失败的回调, 隐藏下拉刷新的状态
					this.mescroll.endErr();
				});
		},
		/* 上拉加载的回调 */
		upCallback(page) {
			// 联网加载数据
			apiNewList(page.num, page.size)
				.then(curPageData => {
					// 联网成功的回调，隐藏下拉刷新和上拉加载的状态
					this.mescroll.endSuccess(curPageData.length);

					// 追加新数据
					this.dataList = this.dataList.concat(curPageData);
				})
				.catch(() => {
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
