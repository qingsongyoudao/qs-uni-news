<template>
	<qs-page>
		<view class="news-list">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
				<view class="list-item" v-for="news in dataList" :key="news.id">
					<view class="list-title">{{ news.title }}</view>
					<view class="list-content">{{ news.content }}</view>
				</view>
			</mescroll-body>
		</view>
	</qs-page>
</template>

<script>
// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
// 引入mescroll-body组件 (如已在main.js注册全局组件,则省略此步骤)
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue';

import { apiNewList } from '@/api/mock.js';

export default {
	mixins: [MescrollMixin],
	components: {
		MescrollBody
	},
	data() {
		return {
			downOption: {},
			upOption: {},
			tabs: {
				items: ['关注', '最新', '热榜', '精读', '直播', '手机', '电脑', '无人机'],
				current: 0
			},
			swiper: {
				current: 0
			},
			dataList: []
		};
	},
	methods: {
		// 打开页面
		openPage(path) {
			this.$u.route({
				url: '/pages/' + path
			});
		},
		// 提示
		tip() {
			return this.$u.toast('暂未开通');
		},
		/* 下拉刷新的回调  */
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
			//联网加载数据
			apiNewList(page.num, page.size)
				.then(curPageData => {
					// 联网成功的回调, 隐藏下拉刷新和上拉加载的状态
					this.mescroll.endSuccess(curPageData.length);

					// 设置列表数据
					this.dataList = this.dataList.concat(curPageData);
				})
				.catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.news-list {
	.list-item {
		padding: 30rpx 30rpx;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid $qs-border-color;
		
		.list-title {
			font-size: 32rpx;
		}
		
		.list-content {
			margin-top: 10rpx;
			color: $u-tips-color;
		}
	}
}
</style>
