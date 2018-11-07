import {TicketDeleteHighlight} from '@/components';

export default ({app, store}, {payload, sender}) => {
	sender.$modal.show(
		TicketDeleteHighlight,
		{
			...payload
			//component props
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
