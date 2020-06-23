<template>
	<qs-page :header="true">
		<!-- 页面头部 -->
		<block slot="header">
			<status-bar></status-bar>
			<nav-bar>
				<view class="u-flex u-m-l-10">
					<u-icon name="setting" size="38" :custom-style="{ padding: '20rpx' }" @click="tip"></u-icon>
				</view>
				<view class="u-flex u-m-r-10">
					<u-icon name="chat" size="38" :custom-style="{ padding: '20rpx' }" @click="tip"></u-icon>
				</view>
			</nav-bar>
		</block>
		<block slot="header-placeholder">
			<status-bar></status-bar>
			<nav-bar></nav-bar>
		</block>
	
		<!-- 页面主体 -->
		<view class="my-box">
			<!-- 用户 -->
			<view class="user-box">
				<!-- 未登录 -->
				<view v-if="!vuex_user.hasLogin" class="u-flex" @click="tip">
					<view class="u-m-r-20"><u-avatar size="120"></u-avatar></view>
					<view class="u-flex-1"><view class="u-font-lg">登录 / 注册</view></view>
					<view><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view>
				</view>
				<!-- 已登录 -->
				<view v-if="vuex_user.hasLogin" class="u-flex" @click="tip">
					<view class="u-m-r-20"><u-avatar :src="user.userFace" mode="circle" size="120"></u-avatar></view>
					<view class="u-flex-1">
						<view class="u-font-lg">{{ user.nickName }}</view>
						<view class="u-m-t-10">
							<u-tag v-for="(item, index) in user.userTag" :key="index" :text="item" mode="plain" type="info" size="mini" class="u-m-r-10" />
						</view>
					</view>
					<view><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view>
				</view>
			</view>
		
			<!-- 跟踪 -->
			<view class="trace-box">
				<u-grid :col="4" :border="false">
					<u-grid-item v-for="(item, index) in trace.model" :key="index">
						<u-icon :name="item.icon" :label="item.text" @click="tip" size="48" label-size="22" margin-top="14" label-pos="bottom"></u-icon>
					</u-grid-item>
				</u-grid>
			</view>
		
			<u-gap height="20"></u-gap>
		
			<!-- 其它 -->
			<view class="other-panel-box">
				<u-cell-group :border="false">
					<view class="panel-main">
						<u-cell-item :title="item.title" :value="item.value" @click="tip" v-for="(item, index) in cells" :key="index" :border-bottom="false"></u-cell-item>
					</view>
				</u-cell-group>
			</view>
		
			<u-gap height="60"></u-gap>
		</view>
		
	</qs-page>
</template>

<script>
export default {
	data() {
		return {
			user: {
				/* 图像 */
				userFace: '',
				/* 昵称 */
				nickName: '',
				/* 标签 */
				userTag: ['钻石会员', '达人']
			},
			trace: {
				model: [
					{
						icon: 'chat',
						text: '评论'
					},
					{
						icon: 'bookmark',
						text: '关注'
					},
					{
						icon: 'star',
						text: '收藏'
					},
					{
						icon: 'eye',
						text: '足迹'
					}
				]
			},
			cells: [
				{
					title: '设置',
					value: '',
					path: ''
				},
				{
					title: '帮助与反馈',
					value: '',
					path: ''
				},
				{
					title: '关于',
					value: 'v1.0.0',
					path: ''
				}
			]
		};
	},
	methods: {
		openPage(path) {
			this.$u.route({
				url: '/pages/' + path
			});
		},
		tip() {
			return this.$u.toast('暂未开通');
		}
	},
	onLoad() {
		if (this.vuex_user.hasLogin) {
			this.user.nickName = this.vuex_user.userName;
			this.user.userFace = this.vuex_user.userFace;
		}
	}
};
</script>

<style lang="scss" scoped>
.my-box {
	.user-box {
		background-color: #ffffff;
		padding: 40rpx 32rpx 0 32rpx;
	}

	.trace-box {
		background-color: #ffffff;
		padding: 0 10rpx 10rpx 10rpx;
	}

	.panel-box {
		background-color: #ffffff;

		.panel-header {
			padding: 30rpx 32rpx 20rpx 32rpx;
			border-bottom: 1rpx solid $qs-border-color-light;
		}

		.panel-main {
			padding: 10rpx 0;
		}
	}

	.other-panel-box {
		.panel-main {
			padding: 10rpx 0;
		}
	}
}
</style>
