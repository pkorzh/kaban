<template>
	<b-container fluid>
		<b-row>
			<b-col cols="3">
				<b-form @submit.prevent="testAccessKeys">
					<b-form-group 
						label="Access Key ID"
						:invalid-feedback="errors.first('accessKeyId')"
						:state="!errors.has('accessKeyId')">
						<b-form-input 
							type="text"
							name="accessKeyId"
							v-model="accessKeyId"
							v-validate="'required'">
						</b-form-input>
					</b-form-group>
					<b-form-group 
						label="Secret Access Key"
						:invalid-feedback="errors.first('secretAccessKey')"
						:state="!errors.has('secretAccessKey')">
						<b-form-input 
							type="text"
							name="secretAccessKey"
							v-model="secretAccessKey"
							v-validate="'required'">
						</b-form-input>
					</b-form-group>
					<b-button type="submit" variant="secondary">
						<span v-t="'testAccessKeys'"></span>
					</b-button>
				</b-form>
			</b-col>
			<b-col cols="3" v-if="step >= 2">
				<b-form @submit.prevent="testBucket">
					<b-form-group 
						label="Bucket"
						:invalid-feedback="errors.first('bucket')"
						:state="!errors.has('bucket')">
						<b-form-select 
							name="bucket"
							v-model="bucket" 
							:options="buckets"
							v-validate="'required'" />
					</b-form-group>
					<b-form-group 
						label="Optional prefix"
						:invalid-feedback="errors.first('prefix')"
						:state="!errors.has('prefix')">
						<b-form-input 
							name="prefix"
							type="text"
							v-model="prefix">
						</b-form-input>
					</b-form-group>

					<b-button type="submit" variant="secondary">
						<span v-t="'testBucketAccess'"></span>
					</b-button>
				</b-form>
			</b-col>
			<b-col cols="3" v-if="step >= 3">
				<div>
					<span v-t="'done'"></span>
				</div>

				<b-button variant="primary" @click="saveCredentials">
					<span v-t="'save'"></span>
				</b-button>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		head() {
			return {
				title: `S3 ${this.$t('storageConfig')}`
			}
		},
		data() {
			return {
				accessKeyId: 'AKIAJ7OZNCOBDNSR4RWQ',
				secretAccessKey: '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',
				bucket: null,
				prefix: null,
				buckets: [],
				step: 1,
			}
		},
		methods: {
			...mapActions('kabanConfiguration/storage/s3', [
				'listBuckets', 'uploadSample', 'saveConfiguration']),

			async testAccessKeys() {
				const valid = await this.$validator.validateAll();
				if (!valid) return;

				this.buckets = await this.listBuckets({
					accessKeyId: this.accessKeyId,
					secretAccessKey: this.secretAccessKey,
				});

				this.step++;
			},

			async testBucket() {
				const valid = await this.$validator.validateAll();
				if (!valid) return;

				await this.uploadSample({
					accessKeyId: this.accessKeyId,
					secretAccessKey: this.secretAccessKey,
					prefix: this.prefix,
					bucket: this.bucket,
				});

				this.step++;
			},

			async saveCredentials() {
				await this.saveConfiguration({
					accessKeyId: this.accessKeyId,
					secretAccessKey: this.secretAccessKey,
					prefix: this.prefix,
					bucket: this.bucket,
				});
			}
		}
	}
</script>
