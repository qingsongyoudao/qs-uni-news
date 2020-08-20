<template>
	<qs-page :header="true" :footer="true">
		<!-- 页面头部 -->
		<block slot="header"><status-bar></status-bar></block>
		<block slot="header-placeholder"><status-bar></status-bar></block>

		<!-- 页面底部 -->
		<block slot="footer">
			<view class="u-flex my-page-footer">
				<view class="footer-action" @click="back"><u-icon name="arrow-left" size="36"></u-icon></view>
				<view class="u-flex-1"><u-search placeholder="说两句..." :show-action="false"></u-search></view>
				<view class="footer-action" @click="tip"><u-icon name="arrow-upward" size="36"></u-icon></view>
				<view class="footer-action" @click="tip"><u-icon name="star" size="36"></u-icon></view>
				<view class="footer-action" @click="tip"><u-icon name="zhuanfa" size="36"></u-icon></view>
				<view class="footer-action" @click="tip"><u-icon name="more-dot-fill" size="36"></u-icon></view>
			</view>
		</block>
		<!-- 页面主体 -->
		<view class="news-detail">
			<!-- #ifdef MP -->
			<nav-bar></nav-bar>
			<!-- #endif -->
			<!-- #ifndef MP -->
			<u-gap height="40"></u-gap>
			<!-- #endif -->
			<view class="detail-title">{{ detail.title }}</view>
			<view class="detail-extra">
				<text>{{ detail.publishDate }}</text>
				<text class="u-m-l-30">{{ detail.source }}</text>
			</view>
			<view class="detail-content">
				<u-parse :html="detail.content"></u-parse>
			</view>
			
			<u-divider>没有更多了</u-divider>
			<u-gap height="160"></u-gap>
		</view>
	</qs-page>
</template>

<script>
var api = require('@/common/js/news.api.js');

export default {
	data() {
		return {
			params: {},
			detail: {}
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
		// 返回
		back() {
			this.$u.route({
				type: 'back',
				animationType: 'slide-in-top'
			});
		}
	},
	onLoad(option) {
		this.params = option;
		// 加载数据
		let params = this.params;
		api.detail(params)
			.then(res => {
				console.log(res);
				if (res.code == 0) {
					this.detail = res.data;
				}
			})
			.catch(err => {
				console.log(err);
			});
	},
	computed: {
		paramsStr() {
			return JSON.stringify(this.params);
		}
	}
};
</script>

<style lang="scss">
.my-page-footer {
	height: 48px;
	background-color: $uni-bg-color-grey;
	padding: 0 10rpx;

	.footer-action {
		padding: 0 20rpx;
	}
}

.news-detail {
	background-color: #ffffff;

	.detail-title {
		border-left: 10rpx solid #d81e06;
		padding: 0 30rpx;
		font-size: $uni-font-size-title;
		font-weight: bold;
		color: $uni-color-title;
		line-height: 1.5;
	}

	.detail-extra {
		padding: 20rpx 30rpx;
		font-size: 24rpx;
		color: $uni-text-color-grey;
	}

	.detail-content {
		padding: 30rpx 30rpx;
		font-size: $uni-font-size-paragraph;
		color: $uni-color-paragraph;
		line-height: 2;
	}
}
</style>
