<template>
	<div>
		<div class="details-post">
			<ul class="details-post-info">
				<li>
					<a href="#">
						<div class="details-avatar"></div>
						Alex Smith
					</a>
				</li>
				<li>
					added a comment
					<span class="details-post-date">11/07/2018    09:00 am</span>
				</li>
			</ul>
		</div>
		<div class="details-post">
			<ul class="details-post-info">
				<li>
					<a href="#">
						<div class="details-avatar"></div>
						Alex Smith
					</a>
				</li>
				<li>
					added a comment
					<span class="details-post-date">11/07/2018    09:00 am</span>
				</li>
			</ul>
		</div>
		<div class="details-post">
			<ul class="details-post-info">
				<li>
					<a href="#">
						<div class="details-avatar"></div>
						Alex Smith
					</a>
				</li>
				<li>
					added a comment
					<span class="details-post-date">11/07/2018    09:00 am</span>
				</li>
			</ul>
		</div>
	</div>
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
