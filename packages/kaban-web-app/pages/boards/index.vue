<template>
	<section>
		<KanbanBoard :board="board"></KanbanBoard>
	</section>
</template>

<script>
	import { mapState } from 'vuex';
	import KanbanBoard from '@/components/KanbanBoard';
	
	export default {
		components: {
			KanbanBoard
		},
		computed: mapState({
			board: s => s.boards.ama
		})
	}
</script>

<style>

</style>
