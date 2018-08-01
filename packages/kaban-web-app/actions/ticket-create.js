import Vue from 'Vue'
import TicketCreateHighlight from '@/components/TicketCreateHighlight';

export default ({app, store}, {payload, sender}) => {
	sender.$modal.show(
		TicketCreateHighlight,
		{
			//component props
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
