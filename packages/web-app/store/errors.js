export default {
	namespaced: true,
	state: {
		lastError: null,
	},
	mutations: {
		SET_LAST_ERROR(state, error) {
			state.lastError = error;
		},
	},
	actions: {
		setLastError({commit}, error) {
			commit('SET_LAST_ERROR', error);
			return error;
		}
	},
	getters: {
		getLastError(state) {
			return state.lastError;
		}
	}
}
