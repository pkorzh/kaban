<template>
	<ul class="details-options">
		<li>
			<h3>Created at:</h3>
			<div>
				{{ ticket.createdAt | moment('LL') }}
			</div>
		</li>
		<li>
			<h3>Updated at:</h3>
			<div>
				{{ ticket.updatedAt | moment('LL') }}
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
