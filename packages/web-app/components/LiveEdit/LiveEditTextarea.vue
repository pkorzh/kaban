<template>
	<div class="editor">
		<template v-if="editable">
			<textarea-autosize
				v-model="editableContent"></textarea-autosize>
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
						<div v-html="content"></div>
					</slot>
					<font-awesome-icon icon="pen" />
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
