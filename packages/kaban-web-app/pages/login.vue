<template>
	<div>
		<h2 class="text-center">Login</h2>
		<hr>
		<b-alert v-if="error" show variant="danger">{{ error + '' }}</b-alert>
		<b-alert show v-if="$auth.$state.redirect">
			You have to login before accessing to <strong>{{ $auth.$state.redirect }}</strong>
		</b-alert>
		<b-row align-h="center" align-v="center">
			<b-col md="4">
				<b-card bg-variant="light">
					<form @keydown.enter="login">
						<b-form-group label="Username">
							<b-input v-model="email" placeholder="anything" type="email" />
						</b-form-group>

						<b-form-group label="Password">
							<b-input type="password" v-model="password" placeholder="123" />
						</b-form-group>

						<div class="text-center">
							<b-btn @click="login" variant="primary" block>Login</b-btn>
						</div>
					</form>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'

	export default {
		data() {
			return {
				email: '',
				password: '',
				error: null
			}
		},
		methods: {
			...mapActions('boards', {
				fetchBoards: 'fetchList'
			}),
			...mapActions('backlogs', {
				fetchBacklogs: 'fetchList'
			}),
			...mapActions('workflow', {
				fetchWorkflows: 'fetchList'
			}),
			...mapActions('status', {
				fetchStatuses: 'fetchList'
			}),
			async login() {
				this.error = null

				return this.$auth
						.loginWith('local', {
							data: {
								email: this.email,
								password: this.password
							}
						})
						.then((res) => {
							return Promise.all([
								this.fetchBoards(),
								this.fetchBacklogs(),
								this.fetchWorkflows(),
								this.fetchStatuses()
							])
						})
						.catch(e => {
							this.error = e + ''
						})
			}
		}
	}
</script>
