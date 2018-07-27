import Vue from 'vue'

Vue.use({
	install() {
		Vue.prototype.$bus = new Vue()
	}
})
