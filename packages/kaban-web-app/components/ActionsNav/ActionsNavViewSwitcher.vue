<template>
	<ul class="switcher">
		<li :class="{ active: value }">
			<a
				href=""
				@click.prevent.stop="switcher()">
				<font-awesome-icon :icon="ic1 " />
			</a>
		</li>
		<li :class="{ active: !value }">
			<a
				href=""
				@click.prevent.stop="switcher()">
				<font-awesome-icon :icon="ic2" />
			</a>
		</li>
	</ul>
</template>

<script>
	export default {
		props: [
			'value',
			'icon1',
			'icon2',
		],
		methods: {
			switcher() {
				this.$emit('input', !this.value)
			}
		},
		computed: {
			ic1() {
				return this.icon1 || 'th-large'
			},

			ic2() {
				return this.icon2 || 'bars'
			}
		}
	}
</script>
