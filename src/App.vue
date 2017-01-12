<script>
	export default {

		computed: {
			hasUser () {
				return this.$store.state.user.id && this.$store.state.user.id !== ""
			}
		},

		data () {
			return {
				navMenu: [
					{ text: 'Link', href: '#!' },
					{ text: 'Link', href: '#!' },
					{ text: 'Link', href: '#!' },
					{ text: 'Link', href: '#!' }
				],
				sideMenu: [
					{ text: 'Settings', href: '/settings', icon: 'settings', router: true },
					{ text: 'Clients', href: '/clients', icon: 'business', router: true },
					{ text: 'Members', href: '/members', icon: 'face', router: true },
					{ text: 'Touchpoints', href: '/touchpoints', icon: 'place', router: true },
					{ text: 'Sensors', href: '/sensors', icon: 'bluetooth', router: true },
					{ text: 'Integrations', href: '/integrations', icon: 'memory', router: true },
					{ text: 'User Extensions', href: '/userextensions', icon: 'note_add', router: true },
					{ text: 'Interfaces', href: '/interfaces', icon: 'code', router: true },
					{ text: 'Scheduled Visits', href: '/scheduledvisits', icon: 'event', router: true },
					{ text: 'Buildings', href: '/buildings', icon: 'location_city', router: true },
					{ text: 'App Access', href: '/appaccess', icon: 'screen_lock_portrait', router: true },
					{ text: 'Roles', href: '/roles', icon: 'blur_circular', router: true },
					{ text: 'Devices', href: '/devices', icon: 'phone_iphone', router: true },
					{ text: 'Types', href: '/types', icon: 'format_list_bulleted', router: true },
					{ text: 'Purposes', href: '/purposes', icon: 'format_list_bulleted', router: true },
					{ text: 'Invites', href: '/invites', icon: 'email', router: true },
					{ text: 'Triggers', href: '/triggers', icon: 'call_split', router: true },
					{ text: 'Users', href: '/users', icon: 'lock', router: true }
				]
			}
		},

		mounted () {
			this.$vuetify.init()
		}
	}
</script>

<template lang="pug">
	v-app(top-navbar footer left-sidebar)

		header
			v-navbar
				v-navbar-side-icon( class="hidden-sm-and-up" )
				v-navbar-logo AltMan
				v-navbar-items
					v-navbar-item( v-bind:item="{ href: '/logout', text: 'Logout', icon: false, router: true }" )
				v-dropdown( v-bind:items="navMenu" id="dropdown" right )

		main
			v-sidebar( id='sidebar' left v-if="hasUser" )
				v-sidebar-items( :items="sideMenu" )

			v-content
				v-container( fluid )
					router-view

		v-footer

</template>

<style lang="stylus">

	@import '../node_modules/vuetify/src/stylus/settings/_colors'

	#resource-container
		height: 100%
		width: 100%

	#delete
		cursor: pointer
		color: $red.lighten-1

	h2
		text-align: left

	.container
		display: flex
		height: 100%
		justify-content: center
		align-items: center

	main
		text-align: left

	.card
		.btn
			margin: 1rem

</style>
