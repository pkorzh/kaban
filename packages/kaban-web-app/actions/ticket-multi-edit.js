import Vue from 'vue'
import MultipleEditHighlight from '@/components/MultipleEditHighlight';

export default ({app, store}, {payload, sender}) => {
	sender.$modal.show(
		MultipleEditHighlight,
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
