<template>
	<view class="news-list">
		<view class="u-flex list-item" v-for="item in list" :key="item.id">
			<view class="list-item-extra">
				<image class="news-pic" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" mode="widthFix" />
			</view>
			<view class="u-flex-1 list-item-main">
				<view class="u-line-2 news-title">{{ item.title }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			// 数据列表
			type: Array,
			default() {
				return [];
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.news-list {
	background-color: #fff;
	
	.list-item {
		padding: 30rpx 30rpx;
		border-bottom: 1upx solid #eee;
		
		.list-item-extra {
			width: 160rpx;
			margin-right: 20rpx;
		}
		
		.list-item-main {
		}
		
		.news-pic {
			width: 160rpx;
		}
		
		.news-title {
			font-size: 26upx;
		}
	}
}
</style>
