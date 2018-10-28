<template>
	<div>
		<p>Choose a method for assigning colors to your cards. If no method is selected, the cards will not have a colored edge.</p>

		<table class="table">
			<thead>
				<tr>
					<th v-t="'color'"></th>
					<th v-t="'tql'"></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="cardColor in cardColors"
					:key="cardColor.key">
					<td>
						<LiveEditInput
							:content="cardColor.color"
							:display="cardColor.color"
							action="boards/cardColor/patch"
							path="color"
							:_key="cardColor.key" />
					</td>
					<td>
						<LiveEditInput
							:content="cardColor.tql"
							:display="cardColor.tql"
							action="boards/cardColor/patch"
							path="tql"
							:_key="cardColor.key" />
					</td>
					<td></td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td>
						<b-input
							class="mb-2 mr-sm-2 mb-sm-0"
							placeholder="Color"
							v-model="newCardColor.color" />
					</td>
					<td>
						<b-textarea
							class="mb-2 mr-sm-2 mb-sm-0"
							placeholder="TQL"
							v-model="newCardColor.tql"></b-textarea>
					</td>
					<td>
						<b-button variant="primary" @click="create">
							Add
						</b-button>
					</td>
				</tr>
			</tfoot>
		</table>

	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		async fetch({store, params, error}) {
			await store.dispatch('boards/cardColor/fetchList', {
				tql: `board = ${params.key}`
			})
		},
		data() {
			return {
				newCardColor: {
					color: null,
					tql: null,
				}
			}
		},
		computed: {
			...mapGetters('boards/cardColor', {
				cardColors: 'getList'
			})
		},
		methods: {
			...mapActions('boards/cardColor', {
				createCardColor: 'create'
			}),

			async create() {
				await this.createCardColor({
					...this.newCardColor,
					board: {
						key: this.$route.params.key
					}
				})

				this.newCardColor = {
					color: null,
					tql: null,
				}
			}
		}
	}
</script>
