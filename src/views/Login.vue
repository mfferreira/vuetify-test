<template lang="pug">
	div(id="container")
		form
			v-card
				v-card-text
					v-card-row(height="75px")
						v-text-input(id="email-input" name="email-input" label="Email"
							v-model="user.email"
							v-bind:disabled="loading")
					v-card-row(height="75px")
						v-text-input(id="pwd-input" name="pwd-input" label="Password" type="password"
							v-model="user.password"
							v-bind:disabled="loading")
				v-card-row
					v-btn(flat block class="darken-1" type="submit"
						@click.native.prevent="setUser"
						v-bind:loading="loading"
						v-bind:disabled="!validForm") Login


</template>

<script>
	import bcrypt from 'bcryptjs'
	import api from "../other/api"


	export default {
		data () {
			return {
				user: {
					email: "",
					password: ""
				},
				loading: false,
				toastInvalidEmail: false
			}
		},

		computed: {
			hasUser () {
				return !!this.$store.getters.currentUser.id
			},
			validForm () {
				return this.user.email !== "" && this.user.password !== ""
			}
		},

		mounted () {
			this.$emit('view', this.meta())

			let that = this
			let userId = this.$cookie.get('userId')

			if (userId) {
				this.loading = true;
				this.axios.get(`${api.base}/users/${userId}`).then((response) => {
					let user = response.data.response[0]
					that.$store.commit('CHANGE_USER', user);
					that.$router.push('getstarted')
					that.loading = false;
				})
			}
		},

		preFetch () {
			return this.methods.meta()
		},

		methods: {
			setUser () {
				if (!this.validateEmail(this.user.email)) {
					if (!this.toastInvalidEmail) {
						this.toastInvalidEmail = true
						this.toast("Please type a valid email address.")
					}
				}
				else {
					let that = this;
					this.loading = true;

					this.axios.get(`${api.base}/users`, {
						params: {
							username: that.user.email
						}
					}).then(function(response){
						let user = response.data.response[0]
						let pwdHash = user.password
						if (bcrypt.compareSync(that.user.password, pwdHash)) {
							that.$store.commit('CHANGE_USER', user);
							that.$cookie.set('userId', user.id, { expires: 7, domain: 'localhost' })
							that.$router.push('getstarted')
						}
						else {
							that.toast("Invalid Login")
						}
						that.loading = false;
					})
				}
			},
			validateEmail (email) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(email);
			},
			meta () {
				return {
					title: 'Card Component | Vuetify',
					h1: 'Cards',
					description: 'Card component for Vuetify Framework',
					keywords: 'vuetify, cards, components'
				}
			},
			toast (message) {
				this.$vuetify.toast.create(message, 'top', 4000, () => this.toastInvalidEmail = false)
			}
		}
	}
</script>

<style lang="stylus" scoped>

	.card
		margin: auto
		width: 500px
		height: 500px
		flex-basis: 500px
		justify-content: space-between
		display: flex
		padding: 1rem
		flex: 1 0 50%
		@media screen and (max-width: 768px)
			flex: 1 0 100%

</style>
