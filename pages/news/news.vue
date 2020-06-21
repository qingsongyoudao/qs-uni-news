<template>
	<qs-page>
		<qs-navbar>
			<view class="u-flex u-m-l-22"><u-icon name="search" size="38" :custom-style="{ padding: '16rpx' }" @click="tip"></u-icon></view>
			<view class="u-flex u-m-r-22">
				<u-icon name="chat" size="38" :custom-style="{ padding: '16rpx' }" @click="tip"></u-icon>
				<u-icon name="scan" size="38" :custom-style="{ padding: '16rpx' }" @click="tip"></u-icon>
			</view>
		</qs-navbar>

		<tabs v-model="tabs.current" :tabs="tabs.items1"></tabs>
		<swiper :style="{ height: height }" :current="tabs.current" @change="swiperChange">
			<swiper-item v-for="(tab, i) in tabs.items" :key="i"><mescroll-item :i="i" :index="tabs.current" :tabs="tabs.items"></mescroll-item></swiper-item>
		</swiper>
	</qs-page>
</template>

<script>
import Tabs from './components/tabs.vue';
import MescrollItem from './components/mescroll-item.vue';

export default {
	components: {
		MescrollItem,
		Tabs
	},
	data() {
		return {
			height: '400px', // 需要固定swiper的高度
			tabs: {
				items: ['关注', '最新', '热榜', '精读', '直播', '手机', '电脑', '无人机'],
				items1: [
					{
						name: '关注'
					},
					{
						name: '最新'
					},
					{
						name: '热榜'
					},
					{
						name: '精读'
					},
					{
						name: '直播'
					},
					{
						name: '手机'
					},
					{
						name: '电脑'
					},
					{
						name: '无人机'
					}
				],
				current: 0
			}
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
		// 轮播
		swiperChange(e) {
			this.tabs.current = e.detail.current;
		}
	},
	onLoad() {
		// 需要固定swiper的高度
		this.height = uni.getSystemInfoSync().windowHeight + 'px';
	}
};
</script>

<style lang="scss" scoped></style>
