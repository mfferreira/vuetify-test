	<template>
		<v-app top-navbar footer left-sidebar>

			<header>
				<v-navbar>
					<v-navbar-side-icon class="hidden-sm-and-up"></v-navbar-side-icon>
					<v-navbar-logo>AltMan</v-navbar-logo>
					<v-navbar-items>
						<v-navbar-item v-dropdown:dropdown
							:item="{ href: '#!', text: 'Menu', icon: false }"
						></v-navbar-item>
					</v-navbar-items>
					<v-dropdown v-bind:items="navMenu" id="dropdown" right></v-dropdown>

				</v-navbar>
			</header>

			<main>
				<v-sidebar id='sidebar'  left v-if="hasUser">
					<v-sidebar-items :items="sideMenu"></v-sidebar-items>
				</v-sidebar>

				<v-content>
					<v-container fluid>
						<router-view></router-view>
					</v-container>
				</v-content>
			</main>

			<v-footer></v-footer>

		</v-app>
	</template>

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
						{ text: 'Settings', href: '/settings', icon: 'settings' },
						{ text: 'Clients', href: '/clients', icon: 'business' },
						{ text: 'Members', href: '/members', icon: 'face' },
						{ text: 'Touchpoints', href: '/touchpoints', icon: 'place' },
						{ text: 'Sensors', href: '/sensors', icon: 'bluetooth' },
						{ text: 'Integrations', href: '/integrations', icon: 'memory' },
						{ text: 'User Extensions', href: '/userextensions', icon: 'note_add' },
						{ text: 'Interfaces', href: '/interfaces', icon: 'code' },
						{ text: 'Scheduled Visits', href: '/scheduledvisits', icon: 'event' },
						{ text: 'Buildings', href: '/buildings', icon: 'location_city' },
						{ text: 'App Access', href: '/appaccess', icon: 'screen_lock_portrait' },
						{ text: 'Roles', href: '/roles', icon: 'blur_circular' },
						{ text: 'Devices', href: '/devices', icon: 'phone_iphone' },
						{ text: 'Types', href: '/types', icon: 'format_list_bulleted' },
						{ text: 'Purposes', href: '/purposes', icon: 'format_list_bulleted' },
						{ text: 'Invites', href: '/invites', icon: 'email' },
						{ text: 'Triggers', href: '/triggers', icon: 'call_split' },
						{ text: 'Users', href: '/users', icon: 'lock' }
					]
				}
			},

			mounted () {
				this.$vuetify.init()
			}
		}
	</script>
