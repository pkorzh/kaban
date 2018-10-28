import {BacklogCreateHighlight} from '@/components';

export default ({app, store}, {payload, sender}) => {
	sender.$modal.show(
		BacklogCreateHighlight,
		{
			//component props
		},
		{
			//modal params
			//https://www.npmjs.com/package/vue-js-modal
			scrollable: true,
			width: '50%',
			height: 'auto'
		}, {
			//eventsa
		}
	)
}
