<template>
	<qs-page>
		
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
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
