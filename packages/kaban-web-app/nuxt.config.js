const bodyParser = require('body-parser')

const pkg = require('./package')

module.exports = {
	mode: 'universal',

	/*
	** Headers of the page
	*/
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#4a68df' },

	/*
	** Global CSS
	*/
	css: [
		'@/assets/scss/main.scss'
	],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'~/plugins/font-awesome',
		'~plugins/vue-js-modal',
		{ src: '~/plugins/vue-shortkey', ssr: false },
		'~/plugins/kaban-event-bus.js',
		'~/plugins/kaban-components',
		{ src: '~/plugins/kaban-actions', ssr: false },
		'~/plugins/vue-moment',
		'~/plugins/axios-interceptors.js',
		'~/plugins/vue-textarea-autosize',
	],

	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://github.com/nuxt-community/axios-module#usage
		'@nuxtjs/axios',
		['bootstrap-vue/nuxt', { css: false }],
	],
	/*
	** Axios module configuration
	*/
	axios: {
		progress: true,
		debug: process.env.NODE_ENV !== 'production'
	},

	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		}
	},

	serverMiddleware: [
		bodyParser.json(),
		'~/api/index.js'
	]
}
