<template lang='pug'>
	v-modal(v-bind:id="modalId")
		v-card
			v-card-text
				p(class="text-xs-center") Edit
				slot
			v-card-row(actions)
				v-btn( @click.native="closeModal(modalId)") Cancel
				v-spacer
				v-btn( @click.native="closeModal(modalId)" class="green white--text") Save
				v-btn( @click.native="closeModal(modalId)" class="grey white--text") Clear

</template>

<script>

export default {
	data() {
		return {}
	},

	props: {
		modalId: String,
		resourceProps: Array
	},

	methods: {
		closeModal (id) {
			// console.log(id)
			this.$vuetify.bus.pub(`modal:close:${id}`)
		}
	}
}

</script>

<style lang="stylus">
</style>
