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

		<ul class="mt-3">
			<li v-for="attachment in attachments" :key="attachment.key">
				<a :href="attachment.url" target="_blank">
					{{ attachment.name }}
				</a>
				<b-dropdown variant="link" size="sm" no-caret>
					<template slot="button-content">
						<font-awesome-icon icon="ellipsis-v" /> 
					</template>
					<b-dropdown-item-button 
						class="text-danger"
						@click="onDeleteAttachment(attachment)">
						<span v-t="'delete'"></span>
					</b-dropdown-item-button>
				</b-dropdown>
				<br>
				<small>
					{{ attachment.user.name }}, 
					{{ attachment.createdAt | moment('LL') }}
				</small>
			</li>
		</ul>
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
