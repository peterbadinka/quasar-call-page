<template>
	<q-page class="q-pa-sm">

	<div class="row">

		<!-- btn add, select filter -->
		<div class="row">
			<q-btn color="primary" icon="add" />
			<q-select
				outlined
				class="q-ml-sm"
				style="width: 200px;"
				label="Dátum akcie"					
				v-model="filterDateValue"
				@input="$store.commit('databazaChangeFilterDate', filterDateValue)"
				:options="$store.state.databaza.filters.filterDataOptions"
			/>
		</div>

		<!-- Table -->
		<table>
			<tr>
				<th>
					
				</th>
			</tr>
		</table>


	</div>

		<div class="row"></div>
		
	</q-page>
</template>

<script>
import axios from 'axios'
import { Loading, QSpinnerGears } from 'quasar'

export default {
	data: () => ({
		filterDateValue: null,
		contacts: [],
	}),
	methods: {
		getData() {

		}
	},
	mounted() {
		this.filterDateValue = this.$store.state.databaza.filters.filterDateValue
		if(this.$store.state.databaza.contacts.length == 0) {
			let contacts = axios.post('/api/databaza/get-contacts', {
				dataUser: this.$store.state.app.appData.dataUser,
				filterDate: this.filterDateValue
			}).then(response => {
				console.log(response.data)
			})
		}
	}
}
</script>

<style>

</style>