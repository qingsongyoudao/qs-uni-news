<template>
	<qs-page>
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
		}
	}
};
</script>

<style lang="scss" scoped></style>
