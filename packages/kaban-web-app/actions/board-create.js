import Vue from 'vue'
import BoardCreateHighlight from '@/components/BoardCreateHighlight';

export default ({app, store}, {payload, sender}) => {
	sender.$modal.show(
		BoardCreateHighlight,
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
