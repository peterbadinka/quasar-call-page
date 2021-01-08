<template>
  <div id="q-app">
		<login-page v-if="!access" @changeAccess="changeAccess"></login-page>
    <router-view v-if="access" />
  </div>
</template>
<script>

export default {
	name: 'App',
	data() {
		return {
			access: false
		}
	},
	methods: {
		changeAccess(result) {
			this.access = result
		}
	},
	components: {
		'login-page': require('pages/PageLogin').default,
		'contact-page': require('pages/PageContact').default
	}
}
</script>

<style>
 .text-strikethrought{
	 text-decoration: line-through;
 }
</style>
