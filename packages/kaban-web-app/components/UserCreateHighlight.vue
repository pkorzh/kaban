<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Create User
				</template>
			</TopBar>

			<button
					class="modal-box-close"
					@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			<b-form id="UserCreateHighlight" @submit.prevent="create" novalidate>
				<b-form-group
						label="Name"
						horizontal
						:invalid-feedback="errors.first('user.name')"
						:state="!errors.has('user.name')">
					<b-form-input
							type="text"
							v-model="user.name"
							name="user.name"
							v-validate="'required'"
							placeholder="User Name" />
				</b-form-group>

				<b-form-group
						label="Description"
						horizontal
						:invalid-feedback="errors.first('user.description')"
						:state="!errors.has('user.description')">
					<b-form-input
							type="text"
							v-model="user.description"
							name="user.description"
							v-validate="'required'"
							placeholder="User Description" />
				</b-form-group>

				<b-form-group
						label="Email"
						horizontal
						:invalid-feedback="errors.first('user.email')"
						:state="!errors.has('user.email')">
					<b-form-input
							type="text"
							v-model="user.email"
							name="user.email"
							v-validate="'required|email'"
							placeholder="User Email" />
				</b-form-group>

				<b-form-group
						label="Password"
						horizontal
						:invalid-feedback="errors.first('user.password')"
						:state="!errors.has('user.password')">
					<b-form-input
							type="password"
							v-model="user.password"
							name="user.password"
							v-validate="'required'"
							placeholder="User Password" />
				</b-form-group>
			</b-form>
		</div>
		<div class="modal-box-footer">
			<button
					class="btn btn-outline-danger"
					@click="$emit('close')">Close</button>
			<button
					type="submit"
					form="UserCreateHighlight"
					class="btn btn-primary">Add</button>
		</div>
	</div>
</template>

<script>
	import { KeyGenerationMixin } from '@/mixins'
	import { mapActions } from 'vuex'

	export default {
		mixins: [KeyGenerationMixin],
		data() {
			return {
				user: {
					name: null,
					description: null,
					email: null,
					password: null,
				}
			}
		},
		methods: {
			...mapActions('users', {
				createUser: 'create'
			}),

			async create() {
				await this.createUser(this.user)

				this.$emit('close')
			}
		}
	}
</script>
