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
			<div class="details-post-content">
				Suspendisse potenti. Donec in arcu ut neque vehicula blandit et ut eros. Nam ex ante, congue ut justo quis, molestie egestas lectus. Ut nec elit eu turpis accumsan interdum a et ante. Praesent et posuere lectus. Nam feugiat, lectus a pretium varius, augue dolor aliquet mi, id tincidunt quam lacus at tortor.
			</div>
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
			<div class="details-post-content">
				Suspendisse potenti. Donec in arcu ut neque vehicula blandit et ut eros. Nam ex ante, congue ut justo quis, molestie egestas lectus. Ut nec elit eu turpis accumsan interdum a et ante. Praesent et posuere lectus. Nam feugiat, lectus a pretium varius, augue dolor aliquet mi, id tincidunt quam lacus at tortor.
			</div>
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
