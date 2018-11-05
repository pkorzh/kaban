export default {
	namespaced: true,
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
