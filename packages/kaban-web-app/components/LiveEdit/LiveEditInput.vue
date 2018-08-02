<template>
	<div>
		<template v-if="editable">
			<input type="text" v-model="editableContent" />
			<button @click="doneEditing">Done Editing</button>
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
