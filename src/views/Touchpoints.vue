<script>

	import xBase from '../components/resource/base.vue'

	export default {
		components: { xBase },

		data () {
			return {
				resourceName: 'Touchpoints',
				columns: [
					{id: 0, title: "Name", resourceProp: 'name'},
					{id: 1, title: "Sensor", resourceProp: "sensorId"},
					{id: 2, title: "Building", resourceProp: "buildingId"}
				],
				computedProps: null,
				apiEndpoint: 'checkpoints',
				storeState: 'checkpoints',
				storeMutation: 'SET_CHECKPOINTS',
				selectedResource: {}
			}
		}
	}

</script>

<template lang="pug">

	x-base(
		v-bind:name="resourceName"
		v-bind:columns="columns"
		v-bind:computedProps="computedProps"
		v-bind:apiEndpoint="apiEndpoint"
		v-bind:storeMutation="storeMutation"
		v-bind:storeState="storeState")

		v-row
			v-col(xs6)
				v-text-input( label="Name" v-model="selectedResource.name" required)
			v-col(xs6)
				v-text-input( label="Generation" v-model="selectedResource.generation" )
			v-col(xs6)
				v-text-input( label="Building" v-model="selectedResource.buildingId" )
			v-col(xs6)
				v-text-input( label="Description" v-model="selectedResource.description" )
			v-col(xs6)
				v-text-input( label="Timezone" v-model="selectedResource.timezone" )
			v-col(xs6)
				v-text-input( label="Purpose" v-model="selectedResource.purposeId" )
			v-col(xs6)
				v-text-input( label="Sensor" v-model="selectedResource.sensorId" )
			v-col(xs6)
				v-text-input( label="Status" v-model="selectedResource.statusId" )
			v-col(xs6)
				v-text-input( label="Type" v-model="selectedResource.typeId" )

</template>
