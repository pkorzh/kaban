<template>
	<div class="row">
		<div class="col-12">
			<h2 class="text-center" v-t="'login'"></h2>
			<b-row align-h="center" align-v="center">
				<b-col md="4">
					<b-card bg-variant="light">
						<b-form id="LoginForm" @submit.prevent="login" novalidate>
							<b-form-group label="Email"
										  :invalid-feedback="errors.first('form.email')"
										  :state="!errors.has('form.email')">
								<b-form-input v-model="form.email" name="form.email" placeholder="Your Email" v-validate="'required|email'"/>
							</b-form-group>

							<b-form-group label="Password"
										  :invalid-feedback="errors.first('form.password')"
										  :state="!errors.has('form.password')">
								<b-form-input type="password" name="form.password" v-model="form.password" placeholder="Password" v-validate="'required'"/>
							</b-form-group>
							<div class="text-center">
								<b-btn 
									type="submit" 
									variant="primary" 
									block 
									form="LoginForm">
										<span v-t="'login'"></span>
									</b-btn>
							</div>
						</b-form>
					</b-card>
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'

	export default {
		data() {
			return {
				form: {
					email: '',
					password: ''
				},
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
				fetchTransitions: 'fetchTransitions'
			}),
			...mapActions('status', {
				fetchStatuses: 'fetchList'
			}),
			...mapActions('users', {
				fetchUsers: 'fetchList'
			}),
			...mapActions('kabanConfiguration', {
				fetchKabanConfStatus: 'fetchStatus'
			}),
			async login() {
				this.error = null

				const valid = await this.$validator.validateAll()

				if (!valid) return

				await this.$auth.loginWith('local', {
					data: {
						email: this.form.email,
						password: this.form.password
					}
				})

				this.fetchBoards()
				this.fetchBacklogs()
				this.fetchTransitions()
				this.fetchStatuses()
				this.fetchUsers()
				this.fetchKabanConfStatus();
			}
		}
	}
</script>
