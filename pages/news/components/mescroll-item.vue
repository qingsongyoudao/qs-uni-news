<template>
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" height="100%" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<list :list="dataList"></list>
	</mescroll-uni>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js';
import List from './list.vue';

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
				auto: true,
				textNoMore: '-- 没有更多了 --'
			},
			page: {
				index: 1,
				size: 6
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
			// 联网加载数据
			uniCloud
				.callFunction({
					name: 'news-list',
					data: {
						page: {
							index: parseInt(page.num),
							size: parseInt(page.size)
						}
					}
				})
				.then(res => {
					console.log(res);
					let curPageData = res.result.data.rows;

					// 联网成功的回调，隐藏下拉刷新和上拉加载的状态
					this.mescroll.endSuccess(curPageData.length);

					// 设置列表数据
					if (page.num == 1) this.dataList = []; // 如果是第一页需手动制空列表

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
