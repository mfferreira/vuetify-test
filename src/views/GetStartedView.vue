<template lang='pug'>
	div(v-if="loggedin")
		v-card( class="secondary" )
			v-card-text
				img( src="public/v.png" )

		p( v-if="loadingClients" )
			v-progress-circular(class="black--text" v-bind:size="20" indeterminate )
			span Loading Clients ...
		p(v-else) Data ready.

		h2 Important Links

		div( class="intro" )
			v-list
				v-list-item
					v-list-item-title
						a( href="http://vuetifyjs.com" target="_blank" ) Vuetify Documentation
				v-list-item
					v-list-item-title
						a( href="https://github.com/vuetifyjs/webpack-ssr" target="_blank" ) Vuetify SSR Webpack
				v-list-item
					v-list-item-title
						a( href="https://github.com/vuetifyjs/webpack" target="_blank" ) Vuetify Webpack

			v-list
				v-list-item
					v-list-item-title
						a( href="https://github.com/vuetifyjs/webpack-simple" target="_blank" ) Vuetify Webpack Simple
				v-list-item
					v-list-item-title
						a( href="http://vuejs.org" target="_blank" ) Vue Documentation
				v-list-item
					v-list-item-title
						a( href="https://github.com/vuejs/awesome-vue" target="_blank" ) Vue Awesome

</template>

<script>
	import api from "../other/api"

	export default {

		data () {
			return {
				loggedin: false,
				loadingClients: false
			}
		},

		methods: {
			getClientList () {
				console.log("getClientList ()")
				this.loadingClients = true
				this.axios.get(`${api.base}/clients/`).then((response) => {
					this.$store.commit('SET_CLIENTS', response.data.response);
					this.loadingClients = false
				})
			}
		},

		mounted () {
			if (!this.$store.state.user.id) {
				this.$router.push({name: 'home'})
			}
			else {
				this.loggedin = true
			}

			if (this.loggedin) {
				if (!this.$store.state.clients.length) {
					this.getClientList()
				}
			}
		}

	}

</script>
