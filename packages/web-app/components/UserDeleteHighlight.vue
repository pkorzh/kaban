<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Delete User
				</template>
			</TopBar>

			<button
					class="modal-box-close"
					@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			Are you sure you want delete this user? All tasks will be unassigned.
		</div>
		<div class="modal-box-footer">
			<button
					class="btn btn-outline-danger"
					@click="$emit('close')">Close</button>
			<b-button variant="primary" @click="justDelete">Delete</b-button>
		</div>
	</div>
</template>

<script>
	import { KeyGenerationMixin } from '@/mixins'
	import { mapActions } from 'vuex'

	export default {
		props: {
			userKey: {
				type: String,
				required: true,
			},
			goBack: {
				type: String,
				required: false
			}
		},
		methods: {
			...mapActions('users', {
				deleteUser: 'delete'
			}),

			async justDelete() {
				await this.deleteUser({ key: this.userKey })

				this.goBack && this.$router.go(this.goBack)
				this.$emit('close')
			}
		}
	}
</script>
