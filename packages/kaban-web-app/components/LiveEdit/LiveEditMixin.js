export default {
	props: {
		content: {
			required: true,
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
		readonly: {
			type: Boolean,
			default: false
		}
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
			if (this.readonly) {
				return;
			}

			this.hovered = !this.hovered
		},
		edit() {
			if (this.readonly) {
				return;
			}

			this.editable = true
		},
		cancelEditing() {
			this.editable = false
			this.hovered = false
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
