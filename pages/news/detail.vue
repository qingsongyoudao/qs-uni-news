<template>
	<qs-page :header="true" :footer="true">
		<!-- 页面头部 -->
		<block slot="header">
			<status-bar></status-bar>
		</block>
		<block slot="header-placeholder">
			<status-bar></status-bar>
		</block>
		
		<!-- 页面底部 -->
		<block slot="footer">
			<view class="u-flex my-page-footer">
				<view class="footer-action" @click="goBack">
					<u-icon name="arrow-left" size="36"></u-icon>
				</view>
				<view class="u-flex-1">
					<u-search placeholder="说两句..." :show-action="false"></u-search>
				</view>
				<view class="footer-action" @click="tip">
					<u-icon name="arrow-upward" size="36"></u-icon>
				</view>
				<view class="footer-action" @click="tip">
					<u-icon name="star" size="36"></u-icon>
				</view>
				<view class="footer-action" @click="tip">
					<u-icon name="zhuanfa" size="36"></u-icon>
				</view>
				<view class="footer-action" @click="tip">
					<u-icon name="more-dot-fill" size="36"></u-icon>
				</view>
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
			<view class="detail-title">苹果 iOS 14/iPadOS 14 开发者预览 / 公测版 Beta 开始推送</view>
			<view class="detail-extra">
				<text>2020-06-23 20:56</text>
				<text class="u-m-l-30">青松有道</text>
			</view>
			<view class="detail-content">
				<view class="u-m-b-20">
					6月23日消息 今天在WWDC 2020大会上，苹果发布了iOS 14、iPadOS14系统，首次（正式）介绍了其最新版的iPhone软件，它为iOS主屏幕带来了多年来最大的变化：小插件，另外还有App资源库、画中画模式等。
				</view>
				<view class="u-m-b-20">
					今天苹果面向开发人员发布了iOS 14/iPadOS 14开发者预览版/公开测试版 Beta ，具体版本号为18A5301，开启新一轮的iOS/iPadOS系统测试，大家可以到【果粉圈】集中讨论。
				</view>
				<view class="u-m-b-20">
					6月24日消息 据媒体《经济日报》上周报道，良维科技（Longwell）预期将拿到苹果 30% 的 Type-C 线材订单，并最终用于 2021 款 iPhone、AirPods、iPad 等产品。
				</view>
				<view class="u-m-b-20">
					良维上周举行董事会，其董事长李淳正表示良维越南厂最快可于 2020 年第 4 季度实现量产，该厂将主要负责生产新款 iPhone，AirPods 与 iPad 等设备的 Type-C的连接器和线材产品。
				</view>
				<view class="u-m-b-20">
					了解到，良维科技是全球第二大连接器、电源线与信号线生产企业，总部位于台湾省台北市，主要客户包括苹果、亚马逊、戴森、惠普、戴尔、联想、三星与LG。在当前的苹果供应链中，良维科技是仅次于日本住友的 Type-C 接口供货商。而此次李淳正预计良维方面可获得约 30% 的苹果订单，约 7500 万条。
				</view>
				<view class="u-m-b-20">
					一项新的使用历史记录功能提供了有关 Mac 在过去 24 小时或过去 10 天内的电池电量的详细信息，分为 “电池电量”和 “屏幕使用情况”，以便您查看电池的性能信息。
				</view>
				<view class="u-m-b-20">
					目前似乎没有 iOS 上使用最多的应用的详细清单，但它确实可以更好地了解随着时间的推移电池电量是如何消耗的。除 “使用历史记录”部分外，还有“电池和电源适配器”部分，它们取代了之前通过“节能”板块提供的功能。您可以选择何时关闭显示器，启用或禁用电源休眠等功能，并根据电池使用情况和连接电源后的使用情况来拆分设置，日程安排功能也存在于此。
				</view>
				<view class="u-m-b-20">
					在菜单栏中，单击电池图标现在可以估计剩余电池电量，该功能已于 2016 年从 macOS Sierra 中删除。当时，苹果表示 macOS Sierra中的电池指示器不准确，导致有关电池性能的信息出现混乱。
				</view>
				<view class="u-m-b-20">
					菜单栏的电池图标还显示能耗很高的应用，如 macOS Catalina 中一样，并且它提供了打开“电池偏好设置”的选项。但是，菜单栏中似乎没有可选择显示（或隐藏）当前电量百分比的选项。
				</view>
				<view class="u-m-b-20">目前，macOS Big Sur 仅限于开发人员使用，今年 7 月将提供公测 Beta 版。</view>
			</view>
			
			<u-divider>没有更多了</u-divider>
			<u-gap height="160"></u-gap>
		</view>
	</qs-page>
</template>

<script>
export default {
	data() {
		return {};
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
		goBack() {
			uni.navigateBack();
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
