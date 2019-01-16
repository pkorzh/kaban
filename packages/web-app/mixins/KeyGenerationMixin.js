export default {
	methods: {
		makeKey(name) {
			if (/\s/.test(name)) {
				return name.split(/\s/)
					.map(w => w[0])
					.join('')
					.toUpperCase()
			} else {
				return name.toUpperCase()
			}
		}
	}
}
