export default {
	props: {
		content: {
			type: String,
			required: true,
			default: '',
		}
	},
	data() {
		return {
			editable: false,
			editableContent: '',
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
		}
	},
	mounted() {
		this.editableContent = this.content
	}
}
