<template>
	<b-dropdown :text="dropdownText" variant="light">
		<b-form-checkbox-group 
			plain 
			v-model="selected" 
			:options="options">
		</b-form-checkbox-group>
	</b-dropdown>
</template>

<script>
	export default {
		data() {
			return {
				selected: [],
				options: [
					{
						text: this.$t('assignedToMe'),
						value: `assignee = "${this.$auth.user.key}"`,
					},
					{
						text: this.$t('bugsOnly'),
						value: 'type = bug',
					},
					{
						text: this.$t('storiesOnly'),
						value: 'type = story',
					},
				],
			};
		},
		computed: {
			dropdownText() {
				return this.tql || this.$t('quickFilters');
			},

			tql() {
				return this.selected.join(' and ');
			}
		},
		watch: {
			tql(newTql, oldTql) {
				if (newTql !== oldTql) {
					this.$emit('filters', newTql);
				}
			}
		},
	}
</script>
