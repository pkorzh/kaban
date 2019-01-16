export default {
	namespaced: true,
	actions: {
		async fetchForecast({commit, getters}, key) {
			return await this.$axios.$get(
				`/api/backlogs/${key}/forecast`
			)
		},
	}
}
