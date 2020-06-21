<template>
	<view class="qs-tabs-bar">
		<view class="tabs-wrap">
			<view class="tabs-box"><u-tabs ref="tabs" :list="tabs" :current="value" @change="tabsChange" height="60"></u-tabs></view>
			<view class="tabs-extra" @click="tip">
				<view class="u-m-l-20 u-m-t-10">
					<u-icon name="list" :size="36"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'qs-tabs',
	props: {
		tabs: Array,
		value: {
			// 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
			type: [String, Number],
			default() {
				return 0;
			}
		}
	},
	data() {
		return {};
	},
	methods: {
		tabsChange(i) {
			if (this.value != i) {
				this.$emit('input', i);
				this.$emit('change', i);
			}
		},
		// 提示
		tip() {
			return this.$u.toast('暂未开通');
		}
	}
};
</script>

<style lang="scss" scoped>
.qs-tabs-bar {
	z-index: 9999;
	position: fixed;
	top: var(--window-top) + 44px;
	left: 0;
	width: 100%;
	background-color: #ffffff;
	padding-bottom: 10rpx;
	box-shadow: 0rpx 6rpx 6rpx -1rpx #efefef;

	.tabs-wrap {
		position: relative;
	}

	.tabs-box {
		padding-right: 80rpx;
	}

	.tabs-extra {
		position: absolute;
		top: 0;
		right: 0;
		width: 80rpx;
		height: 60rpx;
		box-shadow: -7rpx 0rpx 6rpx -7rpx #dcdcdc;
	}
}
</style>
