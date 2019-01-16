<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Delete Backlog
				</template>
			</TopBar>

			<button
					class="modal-box-close"
					@click="$emit('close')">Close</button>
		</div>
		<div class="details">
				<p>You can migrate all tickets to another backlog</p>
				<b-form inline @submit.prevent="migrateAndDelete" class="mb-3">
					<label class="sr-only" for="migrate">Migrate to backlog</label>
					<b-form-select id="migrate"
								   required
								   v-model="backlogToMigrate">
						<template slot="first">
							<option :value="null" disabled>Please select an option</option>
						</template>
						<option v-for="bl in backlogList" :key="bl.key" :value="bl.key">{{bl.name}}</option>
					</b-form-select>
					<b-button type="submit" variant="primary" class="ml-2">Migrate & Delete</b-button>
				</b-form>
				<p>Or delete backlog and all it's data</p>
				<b-button variant="primary" @click="justDelete">Delete</b-button>
		</div>
		<div class="modal-box-footer">
			<button
					class="btn btn-outline-danger"
					@click="$emit('close')">Close</button>
		</div>
	</div>
</template>

<script>
	import { KeyGenerationMixin } from '@/mixins'
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data() {
			return {
				backlogToMigrate: null
			}
		},
		props: {
			backlogKey: {
				type: String,
				required: true,
			},
			goBack: {
				type: String,
				required: false
			}
		},
		methods: {
			...mapActions('backlogs', {
				deleteBacklog: 'delete'
			}),

			async migrateAndDelete() {
				await this.deleteBacklog({
					key: this.backlogKey,
					migrateTo: this.backlogToMigrate
				})

				this.$emit('close')

				this.goBack && this.$router.go(this.goBack)
			},

			async justDelete() {
				await this.deleteBacklog({ key: this.backlogKey })

				this.$emit('close')

				this.goBack && this.$router.go(this.goBack)
			}
		},
		computed: {
			...mapGetters('backlogs', {
				backlogList: 'getList'
			})
		},
	}
</script>
