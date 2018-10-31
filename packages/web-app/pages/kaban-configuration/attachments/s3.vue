<template>
	<b-container fluid>
		<b-form class="w-25" @submit.prevent="setup">
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
				label="Prefix"
				:invalid-feedback="errors.first('prefix')"
				:state="!errors.has('prefix')">
				<b-form-input 
					name="prefix"
					type="text"
					v-model="prefix"
					v-validate="'required'">
				</b-form-input>
			</b-form-group>

			<b-button type="submit" variant="primary">
				<span v-t="'save'"></span>
			</b-button>
		</b-form>
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		head() {
			return {
				title: `S3 ${this.$t('attachmentsStoreConfig')}`
			}
		},
		data() {
			return {
				accessKeyId: null,
				secretAccessKey: null,
				bucket: null,
				prefix: null,
				buckets: [],
			}
		},
		methods: {
			async setup() {
				const valid = await this.$validator.validateAll();
				if (!valid) return;
			}
		}
	}
</script>

<style>

</style>
