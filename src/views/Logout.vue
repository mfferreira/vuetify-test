<script>

	export default {

		data () {
			return {}
		},
		mounted () {
			// this.$vuetify.init()

			this.$cookie.delete('userId')
			this.$store.commit('CLEAR_USER');
			this.$router.push({name: 'home'})
		}

	}

</script>

<template>
	<div></div>
</template>
