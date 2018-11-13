<template>
	<div>
		<div class="details-dropbox">
			<font-awesome-icon icon="cloud-upload-alt" />
			Drop files here to attach or click to browse
			<input 
				type="file" 
				multiple  
				@change="filesChange($event.target.files)"
				class="input-file">
		</div>

		<div class="details-attach">
			<div 
				class="details-attach-item"
				v-for="attachment in attachments" :key="attachment.key">
					<div class="details-attach-item-preview">
						<img
							v-if="isImageAttachment(attachment)"
							:src="attachment.url">

						<img v-else src="../../assets/images/kaban-logo.svg">
					</div>

				<a 
					href=""
					@click.prevent="onDeleteAttachment(attachment)"
					class="details-attach-item-close"></a>

				<span>
					<a :href="attachment.url" target="_blank">
						{{ attachment.name }}<br>
					</a>
					{{ attachment.createdAt | moment('LL') }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';

	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {
			}
		},
		computed: {
			...mapGetters('tickets/attachments', {
				attachments: 'getList'
			})
		},
		methods: {
			...mapActions('tickets/attachments', {
				fetchAttachments: 'fetchList',
				createAttachment: 'create',
				deleteAttachment: 'delete',
				emptyAttachments: 'empty',
			}),

			async filesChange(fileList) {
				const files = [...fileList];
				const uploaded = await Promise.all(files.map(this.$storage.upload));

				uploaded.map(slim => this.createAttachment({
					...slim,
					ticket: this.ticket,
				}));
			},

			onDeleteAttachment(attachment) {
				this.deleteAttachment(attachment);
			},

			isImageAttachment(attachment) {
				return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(attachment.url);
			},
		},
		async mounted() {
			if (process.client) {
				const comments = await this.fetchAttachments({
					tql: `ticket = ${this.ticket.key}`
				});
			}
		},
		destroyed() {
			this.emptyAttachments();
		}
	}
</script>
