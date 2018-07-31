<template>
	<ul class="switcher">
		<li :class="{ active: value }">
			<a
				href=""
				@click.prevent.stop="switcher()">
				<font-awesome-icon icon="th-large" />
			</a>
		</li>
		<li :class="{ active: !value }">
			<a
				href=""
				@click.prevent.stop="switcher()">
				<font-awesome-icon icon="bars" />
			</a>
		</li>
	</ul>
</template>

<script>
	export default {
		props: ['value'],
		methods: {
			switcher() {
				this.$emit('input', !this.value)
			}
		}
	}
</script>
