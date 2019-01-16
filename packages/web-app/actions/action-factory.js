import {BacklogCreateHighlight} from '@/components';

export default (Component, width = '50%') => ({app, store}, {payload, sender}) => {
	sender.$modal.show(
		Component,
		{
			...payload
		},
		{
			scrollable: true,
			width,
			height: 'auto'
		}, {
			//eventsa
		}
	)
}
