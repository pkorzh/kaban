#!/usr/bin/env node

const request = require('request')

const host = 'https://elasticmedia.atlassian.net'
const token = 'cGxhdG9uLmtAYmxpbmsuZ2c6WTJveHVrdjdHUlk1dDhNb3k2T2JERjQw'

const mapStatus = ({name}) => {
	let key;

	switch(name) {
		case 'Closed':
			key = 'done'
			break
		case 'Resolved':
			key = 'doneProgress'
			break
		case 'In Progress':
			key = 'inProgress'
			break
		default:
			key = 'todo'
	}

	return { key }
};

const mapIssuetype = ({name}) => {
	let iconUrl = ''

	switch(name) {
		case 'Task':
			iconUrl = '/tickettypes/task.svg'
			break
		case 'Story':
		case 'Improvement':
			iconUrl = '/tickettypes/story.svg'
			break
		case 'Bug':
			iconUrl = '/tickettypes/bug.svg'
			break
	}

	return {
		name,
		iconUrl,
	}
};

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
			key: 'create-aws-api'
		},
		type: mapIssuetype(issue.fields.issuetype),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		resolvedAt: new Date().toISOString(),
	}));

	console.log(JSON.stringify(issues))
})