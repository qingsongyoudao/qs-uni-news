<template>
	<qs-page>
		<view class="form-box">
			<u-form :model="model" ref="uForm" :errorType="form.errorType">
				<u-form-item class="form-item" label="标题" prop="title" :label-position="form.labelPosition">
					<u-input v-model="model.title" placeholder="请输入标题" type="text" />
				</u-form-item>
				<u-form-item class="form-item" label="图片" prop="imageUrl" :label-position="form.labelPosition">
					<u-input v-model="model.imageUrl" placeholder="请输入图片链接" type="text" />
				</u-form-item>
				<u-form-item class="form-item" label="正文" prop="content" :label-position="form.labelPosition">
					<u-input v-model="model.content" placeholder="请输入正文" type="textarea" height="500" />
				</u-form-item>
			</u-form>

			<u-gap height="40"></u-gap>

			<view class="u-flex">
				<view class="u-flex-5"><u-button type="primary" :loading="loading" @click="submit">提 交</u-button></view>
				<view class="u-flex-1"></view>
				<view class="u-flex-5"><u-button type="default" @click="cancel">取 消</u-button></view>
			</view>

			<u-gap height="100"></u-gap>
		</view>
	</qs-page>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			form: {
				errorType: ['message'],
				labelPosition: 'top'
			},
			model: {
				categoryId: '',
				title: '【视频】五分钟带你体验iOS 14四大新功能，你想看的都在这',
				subTitle: '',
				imageUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-qs-news/6f34cca0-b633-11ea-a30b-e311646dfaf2.jpg',
				videoUrl: '',
				description: '',
				content: '',
				status: 'normal',
				sort: 0,
				author: '',
				source: '',
				publishDate: '2020-06-23 21:06',
				metaTitle: '',
				metaKeywords: '',
				metaDescription: '',
				isComment: false,
				isTop: false,
				isHot: false,
				isScroll: false,
				isSlide: false,
				tag: '',
				isLink: false,
				linkUrl: ''
			},
			rules: {
				title: [
					{
						required: true,
						message: '请输入标题',
						trigger: ['change', 'blur']
					}
				],
				content: [
					{
						required: true,
						message: '请输入正文',
						trigger: ['change', 'blur']
					}
				]
			}
		};
	},
	methods: {
		openPage(path) {
			this.$u.route({
				url: '/pages/account/' + path
			});
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					this.model.publishDate = this.$u.timeFormat((new Date()).valueOf(), 'yyyy-mm-dd hh:ss');
					this.loading = true;
					uniCloud
						.callFunction({
							name: 'news-add',
							data: this.model
						})
						.then(res => {
							console.log(res);
							this.loading = false;
							return this.$u.toast('提交成功');
						});
				} else {
					console.log('验证失败');
				}
			});
		},
		cancel() {
			uni.navigateBack();
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	}
};
</script>

<style lang="scss" scoped>
.form-box {
	background-color: #ffffff;
	padding: 0 30rpx;
}
</style>
