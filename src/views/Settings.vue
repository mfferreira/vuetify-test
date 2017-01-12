<script>

	import _ from 'lodash'
	import api from "../other/api"
	import resource from '../components/resource/list.vue'

	export default {
		components: { resource },

		data () {
			return {
				loggedin: false,
				loading: false,
				resourceName: "Settings",
				columnNames: [
					{id: 0, title: "Name", resourceProp: "name"}
				],
				resourceList: [],
				selectedResource: {}
			}
		},

		methods: {
			getResourceList () {
				this.loading = true
				this.resourceList = []
				this.axios.get(`${api.base}/settings/`).then((response) => {
					this.$store.commit('SET_SETTINGS', response.data.response);
					this.resourceList = response.data.response
					this.loading = false
				})
			},
			resourceSelected (id) {
				console.log(`resourceSelected: ${id}`)
				this.selectedResource = _.find(this.resourceList, {id: id})
				console.log(this.selectedResource)
			},
			addBtnClicked () {
				console.log('add clicked')
				this.selectedResource = {}
			}
		},

		beforeDestroy () {
			this.$vuetify.bus.unsub('resource:selected', this.resourceSelected)
		},

		mounted () {
			this.$vuetify.load(this.init)
			this.$vuetify.bus.sub(`resource:selected`, this.resourceSelected)

			if (!this.$store.state.user.id) {
				this.$router.push({name: 'home'})
			}
			else {
				this.loggedin = true
			}

			if (this.loggedin) {
				if (!this.$store.state.settings.length)  {
					this.getResourceList()
				}
				else {
					this.resourceList = this.$store.state.settings
				}
			}
		}

	}

</script>

<template lang='pug'>

	resource(
		v-bind:title="resourceName"
		v-bind:columnNames="columnNames"
		v-bind:resourceList="resourceList"
		v-bind:loggedin="loggedin"
		v-bind:loading="loading"
		v-bind:refreshResource="getResourceList",
		v-bind:addBtnClicked="addBtnClicked")

		v-row
			v-col(xs12)
				v-text-input( label="Name" v-model="selectedResource.name" )
			v-col(xs12)
				v-text-input( label="Settings" v-model="selectedResource.settings" )

</template>
