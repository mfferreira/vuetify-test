import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
	state,

	actions: {},

	mutations: {
		'CHANGE_USER' (state, payload) {
			state.user = payload
		},
		'CLEAR_USER' (state) {
			state.user = {}
		}
	}
})
