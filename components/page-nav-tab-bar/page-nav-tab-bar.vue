<template>
	<view class="qs-page">
		<!-- 页面头部 -->
		<view>
			<view class="qs-page-header" :style="[headerStyle]">
				<status-bar></status-bar>
				<!-- 导航栏 -->
				<view class="qs-navbar">
					<view class="qs-navbar-inner" :style="[navbarInnerStyle]">
						<slot name="navbar"></slot>
					</view>
				</view>
				<!-- 标签栏 -->
				<view class="qs-tabbar" :style="{ height: Number(tabHeight) + 'rpx' }">
					<view class="qs-tabbar-inner"><u-tabs ref="tabs" :list="tabs" :current="value" @change="tabsChange" :height="tabHeight"></u-tabs></view>
				</view>
			</view>
			<!-- 解决 fixed 定位后导航栏塌陷的问题 -->
			<view class="qs-page-header-placeholder">
				<status-bar></status-bar>
				<view class="qs-navbar-placeholder" :style="{ height: Number(navbarHeight) + 'px' }"></view>
				<view class="qs-tabbar-placeholder" :style="{ height: Number(tabHeight) + 'rpx' }"></view>
			</view>
		</view>
		<!-- 页面主体 -->
		<view class="qs-page-body"><slot>主体</slot></view>
		<!-- 页面底部 -->
		<view class="qs-page-footer"><slot name="footer"></slot></view>
	</view>
</template>

<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠
let menuButtonInfo = {};
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif

export default {
	name: 'page-nav-bar-tab',
	props: {
		// 头部背景颜色
		headerBg: {
			type: String,
			default: '#FFFFFF'
		},
		tabs: Array,
		value: {
			// 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
			type: [String, Number],
			default() {
				return 0;
			}
		},
		// 标签栏高度
		tabHeight: {
			type: [String, Number],
			default: 60
		},
		// 导航栏高度，单位px，非rpx
		navHeight: {
			type: [String, Number],
			default: ''
		},
		zIndex: {
			type: [String, Number],
			default: ''
		}
	},
	data() {
		return {
			menuButtonInfo: menuButtonInfo
		};
	},
	computed: {
		// 整个头部的样式
		headerStyle() {
			let style = {};
			style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.navbar;
			style.background = this.headerBg;
			return style;
		},
		// 导航栏内部盒子的样式
		navbarInnerStyle() {
			let style = {};
			// 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
			style.height = this.navbarHeight + 'px';
			// // 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
			// #ifdef MP
			let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
			style.marginRight = rightButtonWidth + 'px';
			// #endif
			return style;
		},
		// 转换字符数值为真正的数值
		navbarHeight() {
			// #ifdef APP-PLUS || H5
			return this.navHeight ? this.navHeight : 44;
			// #endif
			// #ifdef MP
			// 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
			// 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
			// return menuButtonInfo.navHeight + (menuButtonInfo.top - this.statusBarHeight) * 2;
			// 导航高度
			let navHeight = systemInfo.platform == 'ios' ? 44 : 48;
			return this.navHeight ? this.navHeight : navHeight;
			// #endif
		}
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
.qs-page {
	min-height: 100vh;
	background-color: $uni-bg-color-grey;
}

.qs-page-header {
	width: 100%;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 991;

	.qs-navbar {
		width: 100%;
	}

	.qs-navbar-inner {
		display: flex;
		justify-content: space-between;
		position: relative;
		align-items: center;
	}

	.qs-tabbar {
		width: 100%;
	}
}

.qs-page-header-placeholder {
	width: 100%;
}
</style>
