<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Create ticket
				</template>
			</TopBar>

			<button
				class="modal-box-close"
				@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			<b-form-group
				label="Backlog"
				horizontal>
				<IconedSelect
					getter="backlogs/getList"
					v-model="ticket.backlog" />
			</b-form-group>

			<b-form-group
				label="Type"
				horizontal>
				<IconedSelect
					getter="tickettypes/getList"
					v-model="ticket.type" />
			</b-form-group>

			<hr>

			<component 
				:is="createSlimComponent" 
				v-bind="createSlimProps"
				@close="$emit('close')" />
		</div>
		<div class="modal-box-footer">
			<button
				class="btn btn-outline-danger"
				@click="$emit('close')">Close</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	import CreateMilestoneSlim from './CreateMilestoneSlim';
	import CreateOtherSlim from './CreateOtherSlim';

	export default {
		props: {
			status: {
				type: String,
				required: false
			},
			backlog: {
				type: Object,
				required: false,
			},
			stageIfTQLMatch: {
				type: String,
				required: false,
			}
		},
		data() {
			return {
				ticket: {
					type: this.$store.getters['tickettypes/getList'][0],
					backlog: this.backlog || this.$store.getters['backlogs/getList'][0],
				}
			};
		},
		computed: {
			createSlimComponent() {
				if (this.ticket.type.key === 'milestone') {
					return CreateMilestoneSlim;
				}

				return CreateOtherSlim;
			},

			createSlimProps() {
				return {
					backlog: this.ticket.backlog,
					type: this.ticket.type,
					stageIfTQLMatch: this.stageIfTQLMatch,
					status: this.status,
				};
			}
		}
	}
</script>

<style>
</style>
