<template>
	<div>
		<div class="docs-bar">
			<div class="docs-bar-holder">
				<button
					v-b-toggle.docs-side
					class="btn btn-light">
					<font-awesome-icon icon="align-justify" />
				</button>

				<button
					class="btn btn-light"
					@click="create"
					:disabled="errors.any()"
					v-t="'save'">
				</button>
			</div>
		</div>

		<div class="docs-content-holder">
			<b-form @submit="create">
				<b-form-group
					label="Name"
					:invalid-feedback="errors.first('flatpage.name')"
					:state="!errors.has('flatpage.name')">
					<b-form-input
						type="email"
						v-model="flatpage.name"
						v-validate="'required'"
						name="flatpage.name"
						placeholder="Name">
					</b-form-input>
				</b-form-group>
			</b-form>

			<no-ssr>
				<markdown-editor
					v-model="flatpage.content"
					ref="markdownEditor"></markdown-editor>
			</no-ssr>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		data() {
			return {
				flatpage: {
					name: '',
					content: '',
				}
			}
		},
		methods: {
			...mapActions('flatpages', {
				createFlatpage: 'create'
			}),

			async create() {
				const valid = await this.$validator.validateAll();
				if (!valid) return;

				await this.createFlatpage(this.flatpage)
			}
		}
	}
</script>

<style>
</style>
