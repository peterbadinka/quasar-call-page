<template>
  <div id="q-app">

		<login-page v-if="!$store.state.app.appData.access" />
    <router-view v-if="$store.state.app.appData.access" />

  </div>
</template>

<script>

export default {
	name: 'App',
	data(){
		return {
			devMode: true
		}
	},
	methods: {

	},
	components: {
		'login-page': require('pages/PageLogin').default
	}
}
</script>

<style>
 .text-strikethrought{
	 text-decoration: line-through;
 }
</style>
