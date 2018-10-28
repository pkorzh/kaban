const clients = []

function notifySubscribers(event, data) {
	for (let i in clients) {
        clients[i].write(`event: ${event}\n`);
        clients[i].write(`data: ${JSON.stringify(data)}\n\n`);
	}
}

export {
	clients,
	notifySubscribers,
}