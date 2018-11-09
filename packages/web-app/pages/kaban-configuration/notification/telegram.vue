<template>
	<b-container fluid>
		<b-row>
			<b-col cols="3">
				<b-form @submit.prevent="testToken">
					<b-form-group 
						label="Telegram bot token"
						:invalid-feedback="errors.first('token')"
						:state="!errors.has('token')">
						<b-form-input 
							type="text"
							name="token"
							v-model="token"
							v-validate="'required'">
						</b-form-input>
					</b-form-group>
					<b-button type="submit" variant="secondary">
						<span v-t="'testToken'"></span>
					</b-button>
				</b-form>
			</b-col>
			<b-col cols="3" v-if="step >= 2">
				<div>
					<span v-t="'done'"></span>

					<p>
						{{ bot.first_name }}<br>
						{{ bot.username }}
					</p>
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
				title: `Telegram ${this.$t('notificationConfig')}`
			}
		},
		data() {
			return {
				token: null,
				bot: {},
				step: 1,
			}
		},
		methods: {
			...mapActions('kabanConfiguration/notification/telegram', ['checkToken']),

			...mapActions('kabanConfiguration', [
				'fetchStatus', 'patchConfiguration']),

			async testToken() {
				const valid = await this.$validator.validateAll();
				if (!valid) return;

				const me = await this.checkToken({
					token: this.token,
				});

				if (me.ok) {
					this.step++;
					this.bot = me.result;
				}
			},

			async saveCredentials() {
				await this.patchConfiguration({
					notification: {
						type: 'telegram',
						token: this.token,
					}
				});

				this.fetchStatus();
			}
		}
	}
</script>
