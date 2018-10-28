import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
	inject: true, //this is the default
	fieldsBagName: 'asd' //important to name this something else
})
