import Vue from 'vue'

export default {
	namespaced: true,
	state: {},
	mutations: {
		STATUS(state, payload) {
			Object.keys(payload).forEach(statusKey =>
				Vue.set(state, statusKey, payload[statusKey]));
		},
	},
	getters: {
		storageStatus(state) {
			return state.storageStatus;
		},
	},
	actions: {
		async fetchStatus({commit, getters}, payload) {
			const status = await this.$axios.$get(`/api/kaban-configuration`);
			commit('STATUS', status);
			return status;
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
						saveConfiguration({commit, getters}, payload) {
							return this.$axios.$post(
								`/api/kaban-configuration/storage/s3/save-configuration`,
								payload,
							);
						}
					}
				}
			}
		}
	}
}
