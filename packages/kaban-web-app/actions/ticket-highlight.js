import Vue from 'Vue'
import TicketHighlight from '@/components/TicketHighlight';

export default ({app, store}, {payload, sender}) => {
	sender.$modal.show(
		TicketHighlight,
		{
			//component props
			ticket: payload
		},
		{
			//modal params
			//https://www.npmjs.com/package/vue-js-modal
			width: '75%'
		}, {
			//events
		}
	)
}
