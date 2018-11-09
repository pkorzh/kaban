import axios from 'axios';

export default class Telegram {
	constructor(options) {
		Object.assign(this, options);
	}

	async checkToken() {
		const r = await axios.get(`https://api.telegram.org/bot${this.token}/getMe`);
		return r.data
	},

	async sendMessage(md) {
		await axios.post(`https://api.telegram.org/bot${this.token}/sendMessage`, {
			chat_id: this.chatId,
			text: md,
			parse_mode: 'Markdown',
			disable_web_page_preview: true,
		});
	}
}