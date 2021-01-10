<template>
<q-page padding>
		
	<div class="row">

		<!-- =================================================================== -->
		<!-- btn reload -->
		<!-- =================================================================== -->
		<q-btn label=""
			type="submit" 
			color="primary" 
			style="width: 54px; height: 54px;"
			@click="reload"
			class="q-mr-md">
			<q-icon name="cached" />
		</q-btn>

		<!-- =================================================================== -->
		<!-- btn insert -->
		<!-- =================================================================== -->
		<q-btn label=""
			type="submit" 
			color="primary" 
			style="width: 54px; height: 54px;"
			@click="reload"
			class="q-mr-md">
			<q-icon name="add" />
		</q-btn>

		<!-- =================================================================== -->
		<!-- select mesto -->
		<!-- =================================================================== -->
		<div class="q-pr-md">
			<q-select
				ref="mesto"
				label="Mesto"
				transition-show="flip-up"
				transition-hide="flip-down"
				filled
				v-model="mesto_select"
				multiple
				:options="options"
				counter
				max-values="2"
				hint=""
				style="width: 320px">		
				<template v-slot:prepend>
					<q-icon name="place" />
				</template>
			</q-select>
		</div>	

		<!-- =================================================================== -->
		<!-- input search -->
		<!-- =================================================================== -->
		<div class="q-gutter-md row items-start q-mr-md">
			<q-input 
				filled bottom-slots v-model="searchString" 
				label="Vyhľadať"
				:dense="dense"
				@keyup.enter="reload"
				style="width: 200px">

				<template v-slot:prepend>
					<q-icon name="search" />
				</template>
				<template v-slot:append>
					<q-icon name="close" @click="searchString = ''" class="cursor-pointer" />
				</template>
			</q-input>			
		</div>

		<!-- =================================================================== -->
		<!-- input search -->
		<!-- =================================================================== -->
		<div class="q-gutter-md row items-start q-mr-md">
			<q-input 
				filled bottom-slots v-model="searchString_2" 
				label="Vyhľadať"
				@keyup.enter="reload"
				:dense="dense"
				style="width: 200px">

				<template v-slot:prepend>
					<q-icon name="search" />
				</template>
				<template v-slot:append>
					<q-icon name="close" @click="searchString_2 = ''" class="cursor-pointer" />
				</template>
			</q-input>			
		</div>

		<!-- =================================================================== -->
		<!-- input search -->
		<!-- =================================================================== -->
		<div class="q-gutter-md row items-start">
			<q-input 
				filled bottom-slots v-model="searchString_3" 
				label="Vyhľadať"
				@keyup.enter="reload"
				:dense="dense"
				style="width: 200px">

				<template v-slot:prepend>
					<q-icon name="search" />
				</template>
				<template v-slot:append>
					<q-icon name="close" @click="searchString_3 = ''" class="cursor-pointer" />
				</template>
			</q-input>			
		</div>

	</div>
	
	<!-- =================================================================== -->
	<!-- table -->
	<!-- =================================================================== -->
	<div>	
		<table class="table">
			<tr>
				<th></th>
				<th>Dátum</th>
				<th>Meno</th>
				<th>Stav</th>
				<th>Info</th>
				<th></th>
				<th></th>
			</tr>
			<tr 
				v-for="(item, index) in table_items"
				:key="index">				
				<td @click="selectItem(item)"><q-icon name='edit' /></td>
				<td>{{ item.date_reg }}</td>
				<td>{{ item.name_full }}</td>
			</tr>
		</table>
	</div>

	<q-dialog></q-dialog>

</q-page>
</template>

<script>
import axios from 'axios'
import { Loading, QSpinnerGears } from 'quasar'

export default {
	//===================================================================================================
	// data
	//===================================================================================================
	data() {
		return {
			// input searh
			searchString: '',
			searchString_2: '',
			searchString_3: '',
      ph: '',
      dense: false,

			// select place
			model: null,
      mesto_select: [],
			options: [],
			
			// table
			table_items: [],
			selected_item: {

			}
		}
	},
	//===================================================================================================
	// methods
	//===================================================================================================
	methods: {
		//=======================================================================
		// reload
		//=======================================================================
		reload(){
			if(this.mesto_select.length == 0){
				this.$q.dialog({
					title: 'Call-Page',
					message: 'Je potrebne vyplniť "Mesto"',
					ok: { color: 'primary' },
					cancel: { color: 'negative' }
				})
				return false
			}
			Loading.show({ spinner: QSpinnerGears })
			axios.post("https://app-44.herokuapp.com/api/call-page/custom-data", {				
				mesta: this.mesto_select,
				searchString: this.searchString,
				searchString_2: this.searchString_2,
				searchString_3: this.searchString_3,
				data: this.$store.state.app.appData.data[0]
			}).then((response) => {
				Loading.hide()
				console.log(response)
				this.table_items = response
			})			
		},
		//=======================================================================
		// select item
		//=======================================================================
		selectItem(item){
			this.selected_item = item
			console.log(this.selected_item)
		}
	},
	mounted(){
		let string = this.$store.state.app.appData.data[0].cp_mesta
		string = string.replace(/'/gi, "");
		let array = string.split(",")		
		this.options = array
	},
	//===================================================================================================
	// components
	//===================================================================================================
	components: {
	'select-mesto': require('components/CallPage/SelectMesto').default,
	'input-search': require('components/CallPage/InputSearch').default,
	'table-zoznam': require('components/CallPage/TableZoznam').default,
	}
}
</script>


<style>
	table{
		border-collapse: collapse;
	}
	.table td, th{
		border: 1px solid #ddd;
	}
	.table td, th{		
		padding: 5px;
		padding-right: 10px;
		padding-left: 10px;	
		border-bottom: 1px solid #ddd;
	}
	.table th{
		background-color: #f2f2f2;
	}
	.table tr:hover{
		background: #f2f2f2;
	}
</style>