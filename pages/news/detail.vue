<template>
	<qs-page>
		<!-- 页面主体 -->
		<view class="page-body">
			<detail :detail="detail"></detail>

			<u-divider>没有更多了</u-divider>
			<u-gap height="60"></u-gap>
		</view>
	</qs-page>
</template>

<script>
var api = require('@/common/js/news.api.js');

// 引入 detail 组件
import Detail from './components/detail.vue';

export default {
	components: {
		Detail
	},
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

.page-body {
	background-color: #ffffff;
}
</style>
