<template>
	<q-page padding>
	{{date}}
	</q-page>
</template>

<script>
// import { getAll } from '@/store/'
// import { mapGetters } from 'vuex';

export default {
	data: () => ({
		date: null,
	}),
	methods: {
		getAll() {
			
		}
	},
	mounted() {
		this.date = new Date().getTime() + 86400000 * 3;
		this.date = new Date(this.date)
	},
}
</script>

<style scoped>

</style>