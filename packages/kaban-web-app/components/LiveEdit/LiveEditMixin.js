export default {
	props: {
		content: {
			required: true,
			default: null,
		},
		display: {
			required: false,
			default: null,
		},
		action: {
			type: String,
			required: false,
		},
		path: {
			type: String,
			required: false,
		},
		_key: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			editable: false,
			editableContent: null,
			hovered: false,
		}
	},
	methods: {
		toggleHover() {
			this.hovered = !this.hovered
		},
		edit() {
			this.editable = true
		},
		doneEditing() {
			this.editable = false
			this.hovered = false

			this.$store.dispatch(`${this.action}`, {
				delta: {
					[this.path]: this.editableContent
				},
				key: this._key
			})
		}
	},
	mounted() {
		this.editableContent = this.content
	}
}
