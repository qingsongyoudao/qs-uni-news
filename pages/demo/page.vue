<template>
	<qs-page :header="true" :footer="true">
		<block slot="header"><view style="height: 64px;">header</view></block>
		<view slot="header-placeholder" style="height: 64px;"></view>
		<block slot="footer"><view style="height: 44px; background-color: #DCDFE6;">footer</view></block>
		<view slot="footer-placeholder" style="height: 44px;"></view>
		<view>
			<u-cell-group>
				<u-cell-item :title="i + 1" v-for="(i, index) in 30" :key="index"></u-cell-item>
			</u-cell-group>
		</view>
	</qs-page>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped></style>
