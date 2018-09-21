import {TicketCreateHighlight} from '@/components';

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
