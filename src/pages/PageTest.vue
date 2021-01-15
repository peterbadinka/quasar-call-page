<template>
	<q-page padding>
		<div class="row">	
			<div class="col">
				<table class="">
					<tr>
						<th>Meno</th>
						<th>Mobil</th>
						<th>Poznamky</th>
					</tr>
					<tr v-for="(item, index) in data"
						:key="index"
						@click="sendData(item)">
						<td>{{item.name}}</td>
						<td>{{item.phone}}</td>
						<td>{{item.pozn}}</td>
					</tr>
				</table>
			</div>
		</div>
		<Test
			style=""
			class="q-mt-sm"
			:dataSelect="dataSelect"
			:dataNew="dataNew"
			@addNew="data.push(dataNew)"
			@saveData="saveData()"
		/>
	</q-page>
</template>

<script>
export default {
	data(){
		return {
			data: [
				{ name: 'Name_1', phone: 'Phone_1', pozn: 'Pozn_1' },
				{ name: 'Name_2', phone: 'Phone_2', pozn: 'Pozn_2' },
				{ name: 'Name_3', phone: 'Phone_3', pozn: 'Pozn_3' },
				{ name: 'Name_4', phone: 'Phone_4', pozn: 'Pozn_4' },
			],
			dataNew: {
				name: '',
				phone: '',
				pozn: '',
			},
			dataSelect: {},
		}
	},
	methods: {
		sendData(item) {
			this.dataSelect = item
		},
		saveData() {

		}
	},
	components: {
		'Test': require('components/Test/Test').default,
	}
}
</script>

<style>
table {
	border-collapse: collapse;
}
tr, td, th {
	border: 1px solid #ddd;
	padding-left: 5px;
	padding-right: 5px;
	text-align: left;
}
th {
	background-color: #f5f5f5;
}
tr:hover {
	background-color: #f5f5f5;
}
</style>