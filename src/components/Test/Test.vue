<template>
<div>
	<div>
		Edit <br>
		<form>
			<input type="text" :value="dataSelect.name">
			<input type="text" :value="dataSelect.phone">
			<input type="text" :value="dataSelect.pozn"> <br>
			<button @click="saveData()">Save</button>
		</form>
	</div>
	<div>
		New <br>
		<input type="text" v-model="dataNew.name">
		<input type="text" v-model="dataNew.phone">
		<input type="text" v-model="dataNew.pozn"> <br>
		<button @click="$emit('addNew')">Add New</button>
	</div>
</div>	
</template>

<script>
export default {
	props: ['dataSelect', 'dataNew'],
	data(){
		return {
			data: {
				name: '',
				phone: '',
				pozn: '',
			},
		}
	},
	methods: {
		saveData() {
			
		}
	}

}
</script>

<style>

</style>