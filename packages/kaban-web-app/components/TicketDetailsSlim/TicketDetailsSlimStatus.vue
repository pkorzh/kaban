<template>
	<ul class="details-options">
		<li>
			<h3>Type:</h3>
			<div>
				<LiveEditSelect
					:content="ticket.type"
					:display="ticket.type.name"
					action="tickets/patch"
					getter="tickettypes/getList"
					path="type"
					:readonly="readonly"
					:_key="ticket.key">
						<template slot="display">
							<img
								:src="ticket.type.iconUrl"
								style="width:20px;">
							{{ ticket.type.name }}
						</template>
					</LiveEditSelect>
			</div>
		</li>
		<li>
			<h3>Priority:</h3>
			<div>
				<LiveEditSelect
					:content="ticket.priority"
					:display="ticket.priority.name"
					action="tickets/patch"
					getter="priorities/getList"
					path="priority"
					:readonly="readonly"
					:_key="ticket.key">
						<template slot="display">
							<img
								:src="ticket.priority.iconUrl"
								style="width:20px;">
							{{ ticket.priority.name }}
						</template>
					</LiveEditSelect>
			</div>
		</li>
		<li>
			<h3>Status:</h3>
			<div>
				<span class="details-label">
					{{ ticket.status.name }}
				</span>
			</div>
		</li>
		<li>
			<h3>Resolution:</h3>
			<div>
				<span>
					{{ ticket.resolution }}
				</span>
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
