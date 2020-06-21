<template>
	<view class="news-list">
		<view class="u-flex list-item" v-for="pd in list" :key="pd.id">
			<view class="list-item-extra">
				<image class="prod-pic" :src="pd.pdImg" mode="widthFix" />
			</view>
			<view class="u-flex-1 list-item-main">
				<view class="prod-name">{{ pd.pdName }}</view>
				<view class="prod-price">{{ pd.pdPrice }} 元</view>
				<view class="prod-sold">已售 {{ pd.pdSold }} 件</view>
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
		
		.prod-pic {
			width: 160rpx;
		}
		
		.prod-name {
			font-size: 26upx;
			line-height: 40upx;
			height: 80upx;
			overflow: hidden;
		}
		
		.prod-price {
			margin-top: 10rpx;
			font-size: 26upx;
			color: red;
		}
		
		.prod-sold {
			margin-top: 10rpx;
			font-size: 24upx;
			color: gray;
		}
	}
}
</style>
