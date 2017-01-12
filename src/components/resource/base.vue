<script>
	import _ from 'lodash'
	import resource from './list.vue'
	import api from "../../other/api"

	export default {
		components: { resource },

		props: {
			name: String,
			columns: Array,
			computedProps: Object,
			apiEndpoint: String,
			storeMutation: String,
			storeState: String,
			// selectedResource: Object,
			otherResources: {
				type: Array,
				default () { return [] }
			},
			selectedExtras: {
				type: Array,
				default () { return [] }
			}
		},

		data () {
			return {
				loggedin: false,
				loading: false,
				resourceName: this.name,
				columnNames: this.columns,
				resourceList: [],
				// selectedResource: {},
				otherResourcesData: {}
			}
		},

		computed: this.computedProps,

		methods: {
			getResourceList () {
				this.loading = true
				this.resourceList = []
				this.axios.get(`${api.base}/${this.apiEndpoint}/`, {
					headers: {
						'X-Pick-Keys': _.union(['id'], _.flattenDeep(_.map(this.columns, (col) => {
							return col.resourceProp })))
						// 'X-Reference-Levels': 1
					}
				}).then((response) => {
					this.$store.commit(this.storeMutation, response.data.response);
					this.resourceList = response.data.response
					this.loading = false
				})
			},
			getOtherResources () {
				if (this.otherResources.length) {
					this.loading = true
					this.otherResources.forEach((resource) => {
						this.axios.get(`${api.base}/${resource}/`).then((response) => {
							this.otherResourcesData[resource] = response.data.response
							if (_.keys(this.otherResourcesData).length === this.otherResources.length) {
								this.loading = false
							}
						})
					})
				}
			},
			resourceSelected (resource) {
				// console.log(`(base) resourceSelected`)
				// _.assign(this.selectedResource, resource)
				// console.log('resourceSelected:', this.selectedResource)
				// this.selectedResource = _.find(this.resourceList, {id: resource})
				// console.log(this.selectedResource)
			},
			editModalClosed () {
				console.log('editModal closed. Clearing "this.selectedResource"')
				this.$vuetify.bus.pub(`resource:clear`)
			},
			addBtnClicked () {
				console.log('add clicked')
				this.$vuetify.bus.pub(`resource:clear`)
			}
		},

		beforeDestroy () {
			// this.$vuetify.bus.unsub('resource:selected', this.resourceSelected)
			this.$vuetify.bus.unsub(`modal:close:editModal`, this.editModalClosed)
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
				if (!this.$store.state[this.storeState].length)  {
					this.getResourceList()
					this.getOtherResources()
				}
				else {
					this.resourceList = this.$store.state[this.storeState]
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
		v-bind:addBtnClicked="addBtnClicked",
		v-bind:selectedExtras="selectedExtras")

		slot

</template>
