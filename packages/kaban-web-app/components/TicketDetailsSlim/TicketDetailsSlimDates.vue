<template>
	<ul class="details-options">
		<li>
			<h3>Created at:</h3>
			<div>
				{{ ticket.createdAt | moment('L') }}
			</div>
		</li>
		<li>
			<h3>Updated at:</h3>
			<div>
				{{ ticket.updatedAt | moment('L') }}
			</div>
		</li>
		<li>
			<h3>Resolved at:</h3>
			<div>
				{{ ticket.resolvedAt | moment('L') }}
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
