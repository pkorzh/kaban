const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const pkg = require('./package')

module.exports = {
	mode: 'universal',

	/*
	** Headers of the page
	*/
	head: {
		title: 'Kaban',
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
		{ src: '~/plugins/kaban-sse', ssr: false },
		{ src: '~/plugins/kaban-sse-subscribe', ssr: false },
		{ src: '~/plugins/vue-select', ssr: false },
		{ src: '~/plugins/vue-color', ssr: false },
		`~/plugins/vue-vuelidate`,
		{ src: '~plugins/vue-simplemde', ssr: false },
		{ src: '~plugins/vue-toasted', ssr: false}
	],

	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://github.com/nuxt-community/axios-module#usage
		'@nuxtjs/axios',
		'@nuxtjs/auth',

		['nuxt-i18n', {
			locales: [
				{ code: 'en', iso: 'en-US', file: 'en-US.js' },
				{ code: 'uk', iso: 'uk-UA', file: 'uk-UA.js' }
			],
			defaultLocale: 'en',
			lazy: true,
			langDir: 'lang/'
		}],

		['bootstrap-vue/nuxt', {
			css: false
		}],
	],
	/*
	** Axios module configuration
	*/
	axios: {
		progress: true,
		debug: false,
	},

	env: {
		SSE_URL: '/api/sse',
	},

	auth: {
		redirect: {
			home: '/'
		},
		strategies: {
			local: {
				endpoints: {
					login: { url: '/api/users/login', method: 'post', propertyName: 'token' },
					logout: { url: '/api/users/logout', method: 'post' },
					user: { url: '/api/users/me', method: 'get', propertyName: 'user' }
				}
			}
		}
	},

	router: {
		middleware: ['auth']
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
		cookieParser(),
		'~/api',
	],
}
