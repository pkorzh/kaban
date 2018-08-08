import Vue from 'vue'
import BacklogCreateHighlight from '@/components/BacklogCreateHighlight';

export default ({app, store}, {payload, sender}) => {
	sender.$modal.show(
		BacklogCreateHighlight,
		{
			//component props
		},
		{
			//modal params
			//https://www.npmjs.com/package/vue-js-modal
			width: '50%'
		}, {
			//events
		}
	)
}
