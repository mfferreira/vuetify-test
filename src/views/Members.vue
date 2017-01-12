<script>

	import _ from 'lodash'
	import xBase from '../components/resource/base.vue'

	export default {
		components: { xBase },

		data () {
			return {
				resourceName: 'Members',
				columns: [
					{id: 0, title: "Name", resourceProp: ['firstName', 'lastName']},
					{id: 1, title: "Email", resourceProp: "username"},
					{id: 2, title: "Phone", resourceProp: "phone"}
				],
				computedProps: null,
				apiEndpoint: 'users',
				storeState: 'members',
				storeMutation: 'SET_MEMBERS',
				selectedResourceExtras: {invite: {}},
				selectedExtras: [
					{
						name: 'invite',
						resource: 'invites',
						prop: 'userId'
					}
				]
			}
		},

		computed: {
			currentName () {
				return `${this.selectedResource.firstName} ${this.selectedResource.lastName}`
			},
			selectedResource () {
				let selected = this.$store.getters.selectedResource
				return _.defaults(selected, this.selectedResourceExtras)
			}
		},

		// methods: {
		// 	resourceSelected () {
		// 		// let selected = _.omitBy(this._selectedResource, (value, key) => {
		// 		// 	return /^(get|set) /.test(key)
		// 		// })
		// 		// console.log(`(Members) resourceSelected`, selected)
		// 		// _.assign(this.selectedResource, selected)
		// 	}
		// 	// resourceClear () {
		// 	// 	this.selectedResource = {}
		// 	// }
		// },

		// beforeDestroy () {
		// 	// this.$vuetify.bus.unsub('resource:selected', this.resourceSelected)
		// 	// this.$vuetify.bus.unsub(`resource:clear`, this.resourceClear)
		// },

		// mounted () {
		// 	// this.$vuetify.bus.sub(`resource:selected`, this.resourceSelected)
		// 	// this.$vuetify.bus.sub(`resource:clear`, this.resourceClear)
		// }
	}

</script>

<template lang="pug">

	x-base(
		v-bind:name="resourceName"
		v-bind:columns="columns"
		v-bind:computedProps="computedProps"
		v-bind:apiEndpoint="apiEndpoint"
		v-bind:storeMutation="storeMutation"
		v-bind:storeState="storeState",
		v-bind:selectedExtras="selectedExtras")

		v-row
			v-col(xs6)
				v-text-input( label="First Name" v-model="selectedResource.firstName" )
			v-col(xs6)
				v-text-input( label="Last Name" v-model="selectedResource.lastName" )
			v-col(xs6)
				v-text-input( label="Invited On" v-model="selectedResource.invite.createdAt" )
			v-col(xs6)
				v-text-input( label="Joined On" v-model="selectedResource.createdAt" )

</template>
