import Vue from 'vue'
import TicketCreateHighlight from '@/components/TicketCreateHighlight';

export default ({app, store}, {payload, sender}) => {
	sender.$modal.show(
		TicketCreateHighlight,
		{
			...payload
		},
		{
			//modal params
			//https://www.npmjs.com/package/vue-js-modal
			scrollable: true,
			width: '50%',
			height: 'auto'
		}, {
			//events
		}
	)
}
