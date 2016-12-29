<template lang="pug">
	div(id="container")
		form
			v-card
				v-card-text
					v-card-row(height="75px")
						v-text-input(id="email-input", name="email-input", label="Email" v-model="user.email")
					v-card-row(height="75px")
						v-text-input(id="pwd-input", name="pwd-input", label="Password" type="password" v-model="user.password")
				v-card-row
					v-container(fluid)
						v-progress-circular(class="black--text" indeterminate v-if="loading")
						v-btn(flat block class="darken-1" type="submit" @click.native.prevent="setUser" v-if="!loading" v-bind:disabled="!validForm") Login


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
				return this.$store.state.user.id && this.$store.state.user.id !== ""
			},
			validForm () {
				return this.user.email !== "" && this.user.password !== ""
			}
		},

		mounted () {
			this.$emit('view', this.meta())
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
						let pwdHash = response.data.response[0].password
						if (bcrypt.compareSync(that.user.password, pwdHash)) {
							that.$store.commit('CHANGE_USER', response.data.response[0]);
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

<style lang="stylus">

	.cards
		flex-flow: row wrap
		justify-content: space-between

	.container
		display: flex
		height: 100%
		justify-content: center
		align-items: center

	.card
		margin-left: auto
		margin-right: auto
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
