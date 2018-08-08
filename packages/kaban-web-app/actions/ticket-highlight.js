import Vue from 'vue'
import TicketHighlight from '@/components/TicketHighlight';

export default ({app, store}, {payload, sender}) => {
	sender.$modal.show(
		TicketHighlight,
		{
			//component props
			...payload
		},
		{
			//modal params
			//https://www.npmjs.com/package/vue-js-modal
			scrollable: true,
			width: '75%',
			height: 'auto'
		}, {
			//events
		}
	)
}
