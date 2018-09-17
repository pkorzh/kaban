<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				itemsPerScreen: 0,
				disableLoadMoreUntilLoaded: false
			}
		},
		props: {
			list: {
				type: Array,
				required: true,
			},
			itemSelector: {
				type: String
			}
		},
		watch: {
			list: {
				handler(val) {
					this.disableLoadMoreUntilLoaded = false;
				},
				deep: false
			}
		},
		mounted() {
			const item = this.$el.querySelector(this.itemSelector);

			if(!item) {
				return;
			}

			const pixelsToTheBottom = window.innerHeight - (this.$el.offsetTop + this.$el.offsetHeight)
			const itemsToTheBottom = Math.floor((pixelsToTheBottom < 0 ? 0 : pixelsToTheBottom) / item.offsetHeight)

			this.itemsPerScreen = this.list.length + itemsToTheBottom;

			this.$emit('loadmore', itemsToTheBottom + this.itemsPerScreen);
			this.disableLoadMoreUntilLoaded = true;

			window.addEventListener('scroll', () => {
				const heightOfOneScreen = item.offsetHeight * this.itemsPerScreen;

				const itsTimeToLoad =
						document.documentElement.scrollTop + window.innerHeight >=
						document.documentElement.offsetHeight - heightOfOneScreen

				if (itsTimeToLoad && !this.disableLoadMoreUntilLoaded) {
					this.disableLoadMoreUntilLoaded = true;
					this.$emit('loadmore', this.itemsPerScreen)
				}
			})
		}
	}
</script>
