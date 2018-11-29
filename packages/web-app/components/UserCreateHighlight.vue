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
						label="Email"
						horizontal
						:invalid-feedback="errors.first('user.email')"
						:state="!errors.has('user.email')">
					<b-form-input
							type="text"
							v-model="user.email"
							name="user.email"
							autocomplete="new-email"
							v-validate="'required|email'"
							placeholder="User Email" />
					<b-button 
						:pressed.sync="expanded" 
						variant="link" 
						size="xs">Expand</b-button>
				</b-form-group>

				<b-form-group
						v-if="expanded"
						label="Name"
						horizontal
						:invalid-feedback="errors.first('user.name')"
						:state="!errors.has('user.name')">
					<b-form-input
							type="text"
							v-model="user.name"
							name="user.name"
							autocomplete="new-username"
							v-validate="'required'"
							placeholder="User Name" />
				</b-form-group>

				<b-form-group
						v-if="expanded"
						label="Description"
						horizontal
						:invalid-feedback="errors.first('user.description')"
						:state="!errors.has('user.description')">
					<b-form-input
							type="text"
							v-model="user.description"
							autocomplete="off"
							name="user.description"
							placeholder="User Description" />
				</b-form-group>

				<b-form-group
						v-if="expanded"
						label="Scope"
						horizontal
						:invalid-feedback="errors.first('user.scope')"
						:state="!errors.has('user.scope')">
					<b-form-input
							type="text"
							v-model="user.scope"
							autocomplete="new-scope"
							name="user.scope"
							placeholder="User Scope" />
				</b-form-group>

				<b-form-group
						v-if="expanded"
						label="Password"
						horizontal
						:invalid-feedback="errors.first('user.password')"
						:state="!errors.has('user.password')">
					<b-form-input
							type="password"
							v-model="user.password"
							name="new-password"
							autocomplete="new-password"
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
					scope: 'user',
					password: null,
				},
				expanded: false,
			}
		},
		methods: {
			...mapActions('users', {
				createUser: 'create'
			}),

			async create() {
				const valid = await this.$validator.validateAll();
				if (!valid) return;

				const newuser = { ...this.user };

				if (!newuser.password) {
					newuser.password = Math.random().toString(36).slice(-8);
				}

				if (!newuser.name) {
					newuser.name = newuser.email.split('@')[0];
				}

				await this.createUser(newuser);

				this.$emit('close');

				this.$kaban.dispatch('CreateUserSuccessAction', {
					sender: this,
					payload: {
						user: newuser
					},
				});
			}
		}
	}
</script>
