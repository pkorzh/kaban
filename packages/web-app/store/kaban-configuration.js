import Vue from 'vue'

export default {
	namespaced: true,
	state: {},
	mutations: {
		CONFIGURATION(state, payload) {
			Object.keys(payload).forEach(key =>
				Vue.set(state, key, payload[key]));
		},
	},
	getters: {
		storageStatus(state) {
			return state.storageStatus;
		},
		notificationStatus(state) {
			return state.notificationStatus;
		},
		general(state) {
			return state.general;
		}
	},
	actions: {
		async fetchConfiguration({commit, getters}, payload) {
			const status = await this.$axios.$get(`/api/kaban-configuration`);
			commit('CONFIGURATION', status);
			return status;
		},
		async patchConfiguration({commit, dispatch}, payload) {
			await this.$axios.$patch(`/api/kaban-configuration`, payload);
			await dispatch('fetchConfiguration');
		}
	},
	modules: {
		storage: {
			namespaced: true,
			modules: {
				s3: {
					namespaced: true,
					actions: {
						listBuckets({commit, getters}, payload) {
							return this.$axios.$post(
								`/api/kaban-configuration/storage/s3/list-buckets`,
								payload,
							);
						},
						uploadSample({commit, getters}, payload) {
							return this.$axios.$post(
								`/api/kaban-configuration/storage/s3/upload-sample`,
								payload,
							);
						},
					}
				}
			}
		},
		notification: {
			namespaced: true,
			modules: {
				telegram: {
					namespaced: true,
					actions: {
						checkToken({commit, getters}, payload) {
							return this.$axios.$post(
								`/api/kaban-configuration/notification/telegram/check-token`,
								payload,
							);
						},
					}
				}
			}
		}
	}
}
