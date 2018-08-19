<template>
	<b-dropdown :text="dropdownText" class="ml-3">
		<!--<form action="#" class="form-search">
			<fieldset>
				<input type="text" placeholder="Find a service by name or feature">
				<button><font-awesome-icon icon="search" /></button>
			</fieldset>
		</form>-->

		<template v-if="backlogs">
			<b-dropdown-header>Backlogs</b-dropdown-header>
			<b-dropdown-item
				v-for="backlog in backlogs"
				:key="backlog.key"
				:class="{active: hasBacklogFilterActive(backlog)}"
				@click.prevent.stop="toggleBacklogFilter(backlog)">
				{{ backlog.name }}
			</b-dropdown-item>
		</template>

	</b-dropdown>
</template>

<script>
	export default {
		props: {
			backlogs: {
				type: Array,
				required: false
			}
		},
		data() {
			return {
				localState: {
					backlogs: []
				}
			}
		},
		computed: {
			dropdownText() {
				if (this.localState.backlogs.length) {
					return this.localState.backlogs.join(', ')
				}

				return 'Quick Filters'
			}
		},
		methods: {
			toggleBacklogFilter({key}) {
				const index = this.localState.backlogs.indexOf(key)

				if (index !== -1) {
					this.localState.backlogs.splice(index, 1)
				} else {
					this.localState.backlogs.push(key)
				}
			},
			hasBacklogFilterActive({key}) {
				return this.localState.backlogs.indexOf(key) !== -1
			}
		},
		watch: {
			'localState': {
				handler: function(localState) {
					this.$emit('filter', localState)
				},
				deep: true,
			}
		}
	}
</script>
