import Vue from 'vue'

import * as components from '@/components'

Object.keys(components).forEach(componentName => {
	Vue.component(componentName, components[componentName])
})
