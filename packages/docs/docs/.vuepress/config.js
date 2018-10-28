module.exports = {
	title: '',

	description: 'Kaban Project Management Tool',

	head: [
		['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico` }],
	],

	evergreen: true,

	themeConfig: {
		logo: '/kaban-logo.svg',

		sidebar: [
			'/',
			{
				title: 'Core Concepts',
				collapsable: false,
				children: [
					'/backlogs/',
					'/boards/',
					'/boards/colors',
				]
			},
		],
	},
};