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
		},

		'SET_SELECTED_RESOURCE' (state, payload) {
			state.selectedResource = payload
		},

		'SET_CLIENTS' (state, payload) {
			state.clients = payload
		},

		'SET_SETTINGS' (state, payload) {
			state.settings = payload
		},

		'SET_BUILDINGS' (state, payload) {
			state.buildings = payload
		},

		'SET_MEMBERS' (state, payload) {
			state.members = payload
		},

		'SET_CHECKPOINTS' (state, payload) {
			state.checkpoints = payload
		},
	},

	getters: {
		currentUser: state => state.user,
		selectedResource: state => state.selectedResource
	}
})
