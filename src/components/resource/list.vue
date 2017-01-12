<script>

	import _ from 'lodash'
	import resourceAdd from './add.vue'
	import api from "../../other/api"

	export default {
		components: { resourceAdd },

		data() {
			return {}
		},

		props: {
			title: {
				type: String,
				required: true
			},
			columnNames: {
				type: Array,
				required: true
			},
			resourceList: {
				type: Array,
				required: true
			},
			loggedin: Boolean,
			loading: Boolean,
			refreshResource: {
				type: Function,
				required: true
			},
			addBtnClicked: {
				type: Function,
				required: true
			},
			selectedExtras: {
				type: Array,
				default () { return [] }
			}
		},

		methods: {
			sortColumns (cols) {
				return _.sortBy(cols, ['id'])
			},
			getResourcePath (resource, path) {
				if (_.isString(path))
					return _.get(resource, path)
				return _.map(path, p =>  _.get(resource, p)).join(' ')
			},
			resourceSelected (resource) {
				console.log(`(list) resourceSelected`, resource.id)
				this.$vuetify.bus.pub('modal:open:editModal', {}, true)

				// if (this.selectedExtras.length) {
				// 	this.selectedExtras.forEach((extra) => {
				// 		let params = {}
				// 		params[extra.prop] = resource.id
				// 		this.axios.get(`${api.base}/${extra.resource}/`, {
				// 			params: params
				// 		}).then((response) => {
				// 			resource[extra.name] = response.data.response[0]
				// 			this.$store.commit('SET_SELECTED_RESOURCE', resource);
				// 		})
				// 	})
				// }
				// else {
				// 	this.$store.commit('SET_SELECTED_RESOURCE', resource);
				// }
				console.log(`(list) resourceSelected end`)
				// this.$vuetify.bus.pub(`modal:open:editModal`)
			}
		},

		mounted () {
			this.$vuetify.load(this.init)
			console.log(this.$vuetify.bus)
		}
	}

</script>

<template lang="pug">

	div(v-if="loggedin" id='resource-container' class='px-5 pb-5 pt-3')
		v-row
			v-col(xs12)
				v-row
					v-col(xs8)
						h2 {{ title }}
					v-col(xs4 class="action-buttons")
						v-btn(floating default class="my-3 mx-2" @click.native="refreshResource" v-bind:disabled="loading" v-bind:loading="loading" )
							v-icon refresh
						v-btn(floating success class="my-3 mx-2" @click.native="addBtnClicked" v-bind:disabled="loading" v-modal:editModal="")
							v-icon add
		v-row
			v-col(xs12)
				table(class="striped" class='lg6' v-if="resourceList.length")
					thead
						tr
							th(v-for="c in sortColumns(columnNames)" data-field="c.title.toLowerCase()") {{ c.title }}
							th
					tbody
						tr( v-for="r in resourceList" @click="resourceSelected(r)")
							td( v-for="p in sortColumns(columnNames)" ) {{ getResourcePath(r, p.resourceProp) }}
							td
								a(class="btn-flat" id="delete" v-on:click="delResource(r)")
									i(class="tiny material-icons") close

		resource-add(modalId="editModal")
			slot

</template>

<style lang="stylus" scoped>

	.action-buttons
		text-align: right
		margin-top: auto
		margin-bottom: auto

</style>
