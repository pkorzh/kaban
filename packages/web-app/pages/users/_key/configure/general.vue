<template>
	<div>
		<div>
			<b-form-group
					description="User name">
				<LiveEditInput
						:content="user.name"
						action="users/patch"
						path="name"
						:_key="user.key" />
			</b-form-group>

			<b-form-group
					description="User description">
				<LiveEditTextarea
						:content="user.description"
						action="users/patch"
						path="description"
						:_key="user.key" />
			</b-form-group>

			<b-form-group
					description="User scope">
				<LiveEditTextarea
						:content="user.scope"
						action="users/patch"
						path="scope"
						:_key="user.key" />
			</b-form-group>

			<b-form-group
					description="User email">
				<LiveEditTextarea
						:content="user.email"
						action="users/patch"
						path="email"
						:_key="user.key" />
			</b-form-group>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('users', {
				getUser: 'getOne'
			}),

			user() {
				return this.getUser(this.$route.params.key)
			},
		},
	}
</script>
