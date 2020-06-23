<template>
	<qs-page>
		<view style="background-color: #FF0000;">
			<status-bar></status-bar>
		</view>
		<view style="background-color: #999999;">
			<nav-bar>
				<view slot="left">left</view>
				<view slot="center">center</view>
				<view slot="right">right</view>
			</nav-bar>
		</view>
		<view style="background-color: #666666;">
			<nav-bar>
				<view style="background-color: #007AFF;">left</view>
				<view style="background-color: #2B85E4;">middle</view>
				<view style="background-color: #2979FF;">right</view>
			</nav-bar>
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
