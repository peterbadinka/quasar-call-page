<template>
	<form 
		id="login_form" 
		name="login-form" 
		@submit.prevent
		class="absolute-center login q-md-xl">
		
		<q-input 
			v-model="email"
			@keyup.enter="login"
			name="email"
			label="Email"
			filled 
			type="search"
			style="background: #e8f0fe42"
			class="q-mb-sm">
			<template v-slot:append>
				<q-icon name="email" />
			</template>
		</q-input>

		<q-input 			
			v-model="pass" 
			@keyup.enter="login"
			name="pass"
			label="Password"
			filled :type="isPwd ? 'password' : 'text'">			
			<template v-slot:append>
				<q-icon
					:name="isPwd ? 'visibility_off' : 'visibility'"
					class="cursor-pointer"
					@click="isPwd = !isPwd" />				
			</template>
		</q-input>

		<q-btn @click="login" color="primary" label="Login" class="q-mt-sm"></q-btn>

		<q-dialog></q-dialog>

	</form>
</template>

<script>
import vue from 'vue'
import { Loading, QSpinnerGears } from 'quasar'

const axios = require('axios')

export default {
	data() {
		return {
			pass: '',
			email: '',
			isPwd: true,
		}
	},
	methods: {			
		login() {		
			// Loading.show()
			Loading.show({ spinner: QSpinnerGears })
			let access = axios.post("https://typical-vagabond-kip.glitch.me/api/login", {
				username: this.email,
				password: this.pass
			}).then((response) => {
				this.timer = setTimeout(() => {
					Loading.hide()
					if(response.data.access == true) {
						this.$store.commit('login', response.data)
					}	
					else {
						this.$store.commit('login', response.data)
						this.$q.dialog({
							title: 'Login',
							message: 'Wrong username or password.',
							ok: { color: 'primary' },
							cancel: { color: 'negative' },
							// persistent: true
						})
					}
				}, 200)				
			})
		},
	}
}
</script>

<style scoped>
	.login {
		width: 80%;
		padding: 20px;
		margin-bottom: 20%;
		border: 1px solid #ccc;
		border-radius: 20px;	 
	}
	@media screen and (min-width: 768px) {
		.login {
			width: 40%;
		}
	}
</style>