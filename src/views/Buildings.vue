<script>
	import _ from 'lodash'
	import resource from '../components/resource/list.vue'
	import api from "../other/api"

	export default {
		components: { resource },
		data () {
			return {
				loggedin: false,
				loading: false,
				resourceName: "Buildings",
				columnNames: [
					{id: 0, title: "Name", resourceProp: "name"},
					{id: 1, title: "City", resourceProp: "city"},
					{id: 2, title: "id", resourceProp: "id"}
				],
				resourceList: [],
				selectedResource: {}
			}
		},

		methods: {
			getResourceList () {
				this.loading = true
				this.resourceList = []
				this.axios.get(`${api.base}/buildings/`).then((response) => {
					this.$store.commit('SET_BUILDINGS', response.data.response);
					this.resourceList = response.data.response
					this.loading = false
				})
			},
			resourceSelected (resource) {
				this.$vuetify.bus.pub(`resource:selected`, resource)
				// console.log(`resourceSelected: ${resource}`)
				// this.selectedResource = _.find(this.resourceList, {id: resource})
				// console.log(this.selectedResource)
			},
			editModalClosed () {
				console.log('editModal closed. Clearing "this.selectedResource"')
				this.selectedResource = {}
			},
			addBtnClicked () {
				console.log('add clicked')
				this.selectedResource = {}
			}
		},

		beforeDestroy () {
			// this.$vuetify.bus.unsub('resource:selected', this.resourceSelected)
		},

		mounted () {
			// this.$vuetify.bus.sub(`resource:selected`, this.resourceSelected)
			this.$vuetify.bus.sub(`modal:close:editModal`, this.editModalClosed)

			if (!this.$store.state.user.id) {
				this.$router.push({name: 'home'})
			}
			else {
				this.loggedin = true
			}

			if (this.loggedin) {
				if (!this.$store.state.buildings.length)  {
					this.getResourceList()
				}
				else {
					this.resourceList = this.$store.state.buildings
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
		v-bind:refreshResource="getResourceList"
		v-bind:addBtnClicked="addBtnClicked")

		v-row
			v-col(xs6)
				v-text-input( label="Name" v-model="selectedResource.name" )
			v-col(xs6)
				v-text-input( label="City" v-model="selectedResource.city" )

</template>
