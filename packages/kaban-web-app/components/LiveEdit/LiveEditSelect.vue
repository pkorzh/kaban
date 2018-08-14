<template>
	<div class="form-edit">
		<template v-if="editable">
			<IconedSelect
				:getter="getter"
				v-model="editableContent"
				:icon="icon" />

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
		mixins: [LiveEditMixin],
		props: {
			getter: {
				type: String,
				required: true,
			},
			icon: {
				type: String,
				required: false,
			},
		},
		mounted() {

		}
	}
</script>
