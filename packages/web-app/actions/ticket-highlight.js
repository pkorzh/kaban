import {TicketHighlight} from '@/components';

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
