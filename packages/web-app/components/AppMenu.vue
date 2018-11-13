<template>
	<div class="dropdown-menu-holder">
		<ol>
			<li>
				<span class="dropdown-menu-title">
					<nuxt-link :to="localePath({name: 'boards'})">
						<span v-t="'boards'"></span>
					</nuxt-link>
				</span>
				<ul>
					<li v-for="board in boardList" :key="board.key">
						<nuxt-link :to="localePath({name: 'boards-key', params: {key: board.key}})">
							{{ board.name }}
						</nuxt-link>
					</li>
				</ul>
			</li>
			<li>
				<span class="dropdown-menu-title">
					<nuxt-link :to="localePath({name: 'backlogs'})">
						<span v-t="'backlogs'"></span>
					</nuxt-link>
				</span>
				<ul>
					<li v-for="backlog in backlogList" :key="backlog.key">
						<nuxt-link :to="localePath({name: 'backlogs-key', params: {key: backlog.key}})">
							{{ backlog.name }}
						</nuxt-link>
					</li>
				</ul>
			</li>
			<li>
				<span class="dropdown-menu-title">
					<nuxt-link :to="localePath({name: 'tickets-search'})">
						<span v-t="'search'"></span>
					</nuxt-link>
				</span>
				<ul>
					<li>
						<nuxt-link :to="localePath({name: 'tickets-search', query: {tql: 'assignee = me'}})">
							<span v-t="'assignedToMe'"></span>
						</nuxt-link>
					</li>
					<li>
						<nuxt-link :to="localePath({name: 'tickets-search', query: {tql: 'reporter = me'}})">
							<span v-t="'createdByMe'"></span>
						</nuxt-link>
					</li>
					<li>
						<nuxt-link :to="localePath({name: 'tickets-search', query: {tql: 'createdAt >= yesterday'}})">
							<span v-t="'recent'"></span>
						</nuxt-link>
					</li>
				</ul>
			</li>
			<li>
				<span class="dropdown-menu-title">
					<nuxt-link :to="localePath({name: 'flatpages'})">
						<span v-t="'flatpages'"></span>
					</nuxt-link>
				</span>
				<ul>
					<li v-for="fp in latestFlatpages" :key="fp.key">
						<nuxt-link :to="localePath({name: 'flatpages-key', params: {key: fp.key}})">
							{{ fp.name }}
						</nuxt-link>
					</li>
				</ul>
			</li>

			<li v-if="$auth.user.scope.includes('admin')">
				<span class="dropdown-menu-title">
					<nuxt-link :to="localePath({name: 'users'})">
						<span v-t="'users'"></span>
					</nuxt-link>
				</span>
			</li>

			<li v-if="$auth.user.scope.includes('admin')">
				<span class="dropdown-menu-title">
					<nuxt-link :to="localePath({name: 'kaban-configuration'})">
						<span v-t="'kabanConfiguration'"></span>
					</nuxt-link>
				</span>

				<ul>
					<li v-if="!storageStatus">
						<nuxt-link :to="localePath({name: 'kaban-configuration-storage'})">
							<span v-t="'storageConfig'"></span>
						</nuxt-link>
					</li>
					<li v-if="!notificationStatus">
						<nuxt-link :to="localePath({name: 'kaban-configuration-notification'})">
							<span v-t="'notificationConfig'"></span>
						</nuxt-link>
					</li>
				</ul>
			</li>
		</ol>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'AppMenu',
		computed: {
			...mapGetters('boards', {
				boardList: 'getList'
			}),

			...mapGetters('backlogs', {
				backlogList: 'getList'
			}),

			...mapGetters('kabanConfiguration', ['storageStatus', 'notificationStatus']),

			...mapGetters('flatpages', {
				latestFlatpages: 'getLatest'
			})
		}
	};
</script>

<style>
</style>
