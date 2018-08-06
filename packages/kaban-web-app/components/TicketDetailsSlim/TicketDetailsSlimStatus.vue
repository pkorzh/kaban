<template>
	<ul class="details-options">
		<li>
			<h3>Type:</h3>
			<div>
				<LiveEditSelect :content="ticket.type.name" />
			</div>
		</li>
		<li>
			<h3>Priority:</h3>
			<div>Low</div>
		</li>
		<li>
			<h3>Status:</h3>
			<div>
				<span class="details-label">
					{{ ticket.status.key }}
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
			}
		}
	}
</script>
