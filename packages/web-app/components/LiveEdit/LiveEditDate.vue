<template>
	<div class="editor">
		<template v-if="editable">
			<input
				type="date"
				class="form-control"
				placeholder="Hard Deadline Date"
				:value="dateStr"
				@input="updateDate($event.target.valueAsDate)" />

			<div class="editor-btns">
				<button
					class="btn btn-light"
					@click="doneEditing">
					<font-awesome-icon icon="check" /></button>
				<button
					class="btn btn-light"
					@click="cancelEditing">
					<font-awesome-icon icon="times" /></button>
			</div>
		</template>

		<template v-else>
			<div
				class="editor-holder"
				:class="{readonly}"
				@click="edit"
				@mouseout="toggleHover"
				@mouseover="toggleHover"
				>
					<slot name="display">
						<div>
							{{ displayContent }}
						</div>
					</slot>
					<font-awesome-icon icon="pen" />
				</div>
		</template>
	</div>
</template>

<script>
	import LiveEditMixin from './LiveEditMixin'

	export default {
		mixins: [LiveEditMixin],
		props: {
			content: {
				required: true,
				default: null,
				validator(value) {
					return true
				}
			}
		},
		computed: {
			dateStr() {
				if (this.editableContent) {
					return this.$moment(this.editableContent).format('YYYY-MM-DD')
				}
			},
			displayContent() {
				if (this.content) {
					return this.$moment(this.content).format('LL')
				} else {
					return this.$t('noDate')
				}
			}
		},
		methods: {
			updateDate(date) {
				this.editableContent = this.$moment(date)
			}
		}
	}
</script>
