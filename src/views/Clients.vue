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
				resourceName: "Clients",
				columnNames: [
					{id: 0, title: "Name", resourceProp: "name"},
					{id: 1, title: "Email", resourceProp: "email"},
					{id: 2, title: "Token", resourceProp: "serviceTokens.altitude"}
				],
				resourceList: [],
				selectedResource: {}
			}
		},

		computed: {
			altitudeToken () {
				return _.get(this.selectedResource, 'serviceTokens.altitude')
			},
			particleToken () {
				return _.get(this.selectedResource, 'serviceTokens.particle')
			},
			logentriesToken () {
				return _.get(this.selectedResource, 'serviceTokens.logentries')
			}
		},

		methods: {
			getResourceList () {
				this.loading = true
				this.resourceList = []
				this.axios.get(`${api.base}/clients/`).then((response) => {
					this.$store.commit('SET_CLIENTS', response.data.response);
					this.resourceList = response.data.response
					this.loading = false
				})
			},
			resourceSelected (resource) {
				console.log(`resourceSelected: ${resource}`)
				this.selectedResource = _.find(this.resourceList, {id: resource})
				console.log(this.selectedResource)
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
			this.$vuetify.bus.unsub('resource:selected', this.resourceSelected)
		},

		mounted () {
			this.$vuetify.load(this.init)
			this.$vuetify.bus.sub(`resource:selected`, this.resourceSelected)
			this.$vuetify.bus.sub(`modal:close:editModal`, this.editModalClosed)

			if (!this.$store.state.user.id) {
				this.$router.push({name: 'home'})
			}
			else {
				this.loggedin = true
			}

			if (this.loggedin) {
				if (!this.$store.state.clients.length)  {
					this.getResourceList()
				}
				else {
					this.resourceList = this.$store.state.clients
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
				v-text-input( label="Email" v-model="selectedResource.email" )
			v-col(xs6)
				v-text-input( label="Address" v-model="selectedResource.address" )
			v-col(xs6)
				v-text-input( label="Phone" v-model="selectedResource.phone" )
			v-col(xs6)
				v-select(v-bind:options="[{ text: '10-19', value: 1 }, { text: '20+', value: 2 }]" label="Type" defaultText="None" v-bind:defaultDisabled="false")
			v-col(xs6)
				v-select(v-bind:options="[{ text: '10-19', value: 1 }, { text: '20+', value: 2 }]" label="Parent Client" defaultText="None" v-bind:defaultDisabled="false")
			v-col(xs6)
				v-text-input( label="Client Since" v-model="selectedResource.clientSince" )
			v-col(xs6)
				v-text-input( label="Client Until" v-model="selectedResource.clientUntil" )
			v-col(xs6)
				v-select(v-bind:options="[{ text: '10-19', value: 1 }, { text: '20+', value: 2 }]" label="Status" defaultText="None" v-bind:defaultDisabled="false")
			v-col(xs6)
				v-select(v-bind:options="[{ text: '10-19', value: 1 }, { text: '20+', value: 2 }]" label="Role" defaultText="None" v-bind:defaultDisabled="false")
			v-col(xs6)
				v-text-input( label="Logo URL" v-model="selectedResource.logoUrl" )
			v-col(xs6)
				v-text-input( label="Logo Blob" v-model="selectedResource.logoBlob" )
			v-col(xs12)
				v-text-input( label="Altitude Token" v-model="altitudeToken" )
			v-col(xs12)
				v-text-input( label="Particle Token" v-model="particleToken" )
			v-col(xs12)
				v-text-input( label="Logentries Token" v-model="logentriesToken" )


</template>
