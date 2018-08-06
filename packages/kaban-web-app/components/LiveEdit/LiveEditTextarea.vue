<template>
	<div class="form-edit">
		<template v-if="editable">
			<textarea-autosize
				class="form-textarea"
				v-model="editableContent"></textarea-autosize>
			<button
				class="btn btn-light"
				@click="doneEditing">
				Done Editing</button>
		</template>

		<template v-else>
			<div
				@click="edit"
				@mouseout="toggleHover"
				@mouseover="toggleHover"
				>
					<div v-html="content"></div>
				</div>
		</template>
	</div>
</template>

<script>
	import LiveEditMixin from './LiveEditMixin'

	export default {
		mixins: [LiveEditMixin]
	}
</script>
