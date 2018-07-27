#!/usr/bin/env node

const request = require('request')

const host = 'https://elasticmedia.atlassian.net'
const token = 'cGxhdG9uLmtAYmxpbmsuZ2c6WTJveHVrdjdHUlk1dDhNb3k2T2JERjQw'

const mapStatus = ({name}) => 'todo';

request.get({
	url: `${host}/rest/api/2/search`,
	json: true,
	qs: {
		jql: 'project = AMA ORDER BY created DESC'
	},
	headers: {
		'Authorization': `Basic ${token}`,
	}
}, (error, response, body) => {

	const issues = body.issues.map(issue => ({
		id: issue.id,
		key: issue.key,
		name: issue.fields.summary,
		status: mapStatus(issue.fields.status),
		backlog: {
			key: 'native-feed-profile'
		}
	}));

	console.log(JSON.stringify(issues))
})