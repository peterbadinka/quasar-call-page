<template>
	<q-page padding>		
		<table class="">
			<tr>
				<th>Head_1</th>
				<th>Head_2</th>
				<th>Head_3</th>
				<th>Head_4</th>
			</tr>
			<tr v-for="(item, index) in data"
				:key="index">
				<td>{{item.name}}</td>
				<td>{{item.phone}}</td>
			</tr>
		</table>
		<Test />
	</q-page>
</template>

<script>
export default {
	data(){
		return {
			data: [
				{ name: 'Name_1', phone: 'Phone_1', msg: 'Msg_1' },
				{ name: 'Name_2', phone: 'Phone_2', msg: 'Msg_2' },
				{ name: 'Name_3', phone: 'Phone_3', msg: 'Msg_4' },
				{ name: 'Name_4', phone: 'Phone_4', msg: 'Msg_5' },
			]
		}
	},
	methods: {

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
}
</style>