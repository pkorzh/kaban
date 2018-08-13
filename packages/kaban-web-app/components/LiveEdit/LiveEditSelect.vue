<template>
	<div class="form-edit">
		<template v-if="editable">
			<IconedSelect
				:getter="getter"
				v-model="editableContent" />

			<div class="editor-btns">
				<button
					class="btn btn-light"
					@click="doneEditing">
					<font-awesome-icon icon="check" /></button>
				<button
					class="btn btn-light"
					@click="doneEditing">
					<font-awesome-icon icon="times" /></button>
			</div>
		</template>

		<template v-else>
			<div
				@click="edit"
				@mouseout="toggleHover"
				@mouseover="toggleHover"
				>
					<div v-html="display"></div>
				</div>
		</template>
	</div>
</template>

<script>
	import LiveEditMixin from './LiveEditMixin'

	export default {
		mixins: [LiveEditMixin],
		props: {
			getter: {
				type: String,
				required: true,
			}
		},
		mounted() {

		}
	}
</script>
