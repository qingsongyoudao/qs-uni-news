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
			<u-gap height="88"></u-gap>
		</block>
		<!-- 页面主体 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" @emptyclick="emptyClick">
			<list :list="dataList"></list>
		</mescroll-body>
		
	</qs-page>
</template>

<script>
var api = require('@/common/js/news.api.js');

// 引入 mixins
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
// 引入 mescroll-body 组件
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue';
// 引入 list 组件
import List from './components/list.vue';

export default {
	mixins: [MescrollMixin],
	components: {
		MescrollBody,
		List
	},
	data() {
		return {
			height: '400px', // 需要固定swiper的高度
			// 标签栏
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
				current: 1
			},
			// 下拉刷新的配置
			downOption: {
				auto: false // 是否在初始化完毕之后，自动执行一次下拉刷新的回调 downCallback，默认 true
			},
			// 上拉加载的配置
			upOption: {
				page: {
					size: 8 // 每页数据的数量，默认 10
				},
				textNoMore: '-- 没有更多了 --',
				empty: {
					tip: '暂无相关信息'
				}
			},
			// 列表数据
			dataList: [],
			// 搜索
			search: {
				keyword: '',
				category: '',
				status: '',
				tag: ''
			}
		};
	},
	methods: {
		/* 下拉刷新的回调 */
		downCallback() {
			// 下拉刷新和上拉加载调同样的接口, 重置列表为第一页 (自动执行 page.num=1, 再触发 upCallback 方法 )
			this.mescroll.resetUpScroll();
		},
		/* 上拉加载的回调 */
		upCallback(page) {
			let params = {
				keyword: this.search.keyword,
				categoryId: this.search.category,
				status: this.search.status,
				tag: this.search.tag,
				sort: ['_id', 'desc'],
				page: {
					index: page.num,
					size: page.size
				}
			};
			// 加载数据
			api.list(params)
				.then(res => {
					console.log(res);
					// 接口返回的当前页数据列表，数组
					let curPageData = res.data.rows;

					// 接口返回的当前页数据长度
					let curPageLen = curPageData.length;

					// 接口返回的总数据量
					let totalSize = res.data.total;

					// 后台接口有返回列表的总数据量 totalSize
					setTimeout(() => {
						this.mescroll.endBySize(curPageLen, totalSize);
					}, 20);

					// 设置列表数据
					// 如果是第一页需手动置空列表
					if (page.num == 1) this.dataList = [];
					// 追加新数据
					this.dataList = this.dataList.concat(curPageData);
				})
				.catch(err => {
					console.log(err);
					// 请求失败，隐藏加载状态
					this.mescroll.endErr();
				});
		},
		// 标签栏
		tabsChange(i) {
			this.tabs.current = i;
			// 查询条件
			switch (this.tabs.current) {
				case 0:
					this.search.category = '';
					this.search.tag = '关注';
					break;
				case 1:
					this.search.category = '';
					this.search.tag = '';
					break;
				case 2:
					this.search.category = '';
					this.search.tag = '热榜';
					break;
				case 3:
					this.search.category = '';
					this.search.tag = '精读';
					break;
				case 4:
					this.search.category = '';
					this.search.tag = '直播';
					break;
				case 5:
					this.search.category = 'fcca363a5ef715df0005cd13300816c6';
					this.search.tag = '';
					break;
				case 6:
					this.search.category = '5ef369a209e2e5004d313950';
					this.search.tag = '';
					break;
				case 7:
					this.search.category = '5ef369613e8e0b004da1709e';
					this.search.tag = '';
					break;
			}
			// 先置空列表，显示加载进度
			this.dataList = [];
			// 再刷新列表数据
			this.mescroll.resetUpScroll();
			// 滚动到顶部
			this.mescroll.scrollTo(0);
		},
		// 打开页面
		openPage(path) {
			if (path == '') {
				return this.$u.toast('暂未开通');
			}
			this.$u.route({
				url: '/pages/' + path
			});
		},
		// 提示
		tip() {
			return this.$u.toast('暂未开通');
		}
	}
};
</script>

<style lang="scss" scoped></style>
