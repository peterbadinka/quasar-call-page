<template>
	<q-page padding>
		
		<div class="row">
			<select-mesto />
			<input-search />
		</div>
		
		<table-zoznam />

	</q-page>
</template>

<script>
import InputSearch from 'src/components/CallPage/InputSearch.vue'
export default {
	components:{
		'select-mesto': require('components/CallPage/SelectMesto').default,
		'input-search': require('components/CallPage/InputSearch').default,
		'table-zoznam': require('components/CallPage/TableZoznam').default,
	}
}
</script>

InputSearch
<style>

</style>