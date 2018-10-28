import moduleFactory from '../module-factory'

export default moduleFactory('flatpages', {
	state: {
	},
	actions: {
		async getContent({commit, getters}, key) {
			const rawEntity = await this.$axios.$get(`/api/flatpages/content/${key}`)
			return rawEntity.content
		}
	}
})
