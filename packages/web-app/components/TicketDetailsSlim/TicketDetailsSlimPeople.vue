<template>
	<ul class="details-options details-options-assign">
		<li v-if="ticket.assignee">
			<h3>Assignee</h3>
			<div>
				<LiveEditSelect
					:content="ticket.assignee"
					:display="ticket.assignee.name"
					action="tickets/patch"
					getter="users/getList"
					path="assignee"
					:readonly="readonly"
					:_key="ticket.key">
						<template slot="display">
							<avatar 
								inline
								:src="ticket.assignee.avatar" 
								:username="ticket.assignee.name"
								:size="20"></avatar>
							{{ ticket.assignee.name }}
						</template>
					</LiveEditSelect>
			</div>
		</li>
		<li>
			<h3>Reporter</h3>
			<div>
				<LiveEditSelect
					:content="ticket.reporter"
					:display="ticket.reporter.name"
					:readonly="readonly"
					action="tickets/patch"
					getter="users/getList"
					path="reporter"
					icon="avatar"
					:_key="ticket.key">
						<template slot="display">
							<avatar
								inline 
								:src="ticket.reporter.avatar" 
								:username="ticket.reporter.name"
								:size="20"></avatar>
							{{ ticket.reporter.name }}
						</template>
					</LiveEditSelect>
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			},
			readonly: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
