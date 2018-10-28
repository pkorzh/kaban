<template>
	<b-dropdown text="Assigned">
		<form action="#" class="form-search">
			<fieldset>
				<input type="text" placeholder="Find a user">
				<button><font-awesome-icon icon="search" /></button>
			</fieldset>
		</form>

		<b-dropdown-item v-for="user in userList" :key="user.key">
			<img :src="user.avatar" style="width: 20px">
			{{ user.name }}
		</b-dropdown-item>
	</b-dropdown>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		methods: {
		},
		computed: {
			...mapGetters('users', {
				userList: 'getList'
			})
		}
	}
</script>
