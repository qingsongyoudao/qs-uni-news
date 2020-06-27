<template>
	<qs-page :header="true">
		<!-- 页面头部 -->
		<block slot="header">
			<status-bar></status-bar>
			<nav-bar>
				<view class="u-flex u-m-l-10">
					<u-icon name="search" size="38" :custom-style="{ padding: '20rpx' }" @click="tip"></u-icon>
				</view>
				<view class="u-flex u-m-r-10">
					<u-icon name="chat" size="38" :custom-style="{ padding: '20rpx' }" @click="tip"></u-icon>
					<u-icon name="scan" size="38" :custom-style="{ padding: '20rpx' }" @click="tip"></u-icon>
				</view>
			</nav-bar>
			<u-tabs ref="tabs" :list="tabs.items" :current="tabs.current" @change="tabsChange" height="80" active-color="#D81E06"></u-tabs>
		</block>
		<block slot="header-placeholder">
			<status-bar></status-bar>
			<nav-bar></nav-bar>
			<u-gap height="80"></u-gap>
		</block>
	
		<!-- 页面主体 -->
		<swiper :style="{ height: height }" :current="tabs.current" @change="swiperChange">
			<swiper-item v-for="(tab, i) in tabs.items" :key="i">
				<mescroll-item :index="tabs.current"></mescroll-item>
			</swiper-item>
		</swiper>
	</qs-page>
</template>

<script>
import MescrollItem from './components/mescroll-item.vue';

export default {
	components: {
		MescrollItem
	},
	data() {
		return {
			height: '400px', // 需要固定swiper的高度
			tabs: {
				items: [
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
		// 标签栏
		tabsChange(i) {
			this.tabs.current = i;
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
