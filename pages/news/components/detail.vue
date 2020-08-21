<template>
	<view class="news-detail">
		<view class="detail-title">{{ detail.title }}</view>
		<view class="detail-extra">
			<text>{{ detail.publishDate }}</text>
			<text class="u-m-l-30">{{ detail.source }}</text>
		</view>
		<view class="detail-content">
			<u-parse :html="detail.content"></u-parse>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		detail: {
			// 数据
			type: Object,
			default() {
				return {};
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.news-detail {

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
