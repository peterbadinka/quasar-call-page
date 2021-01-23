<template>
<q-page class="q-pa-sm">
		
	<div class="row">
		
		<!-- =================================================================== -->
		<!-- btn reload -->
		<!-- =================================================================== -->
		<q-btn label=""
			type="submit" 
			color="primary" 
			style="width: 54px; height: 54px;"
			@click="reloadData"
			class="q-mr-sm">
			<q-icon name="cached" />
		</q-btn>

		<!-- =================================================================== -->
		<!-- btn insert -->
		<!-- =================================================================== -->
		<q-btn 
			v-if="false"
			label=""
			type="submit" 
			color="primary" 
			style="width: 54px; height: 54px;"
			@click="reloadData"
			class="q-mr-sm">
			<q-icon name="add" />
		</q-btn>

		<!-- =================================================================== -->
		<!-- input search -->
		<!-- =================================================================== -->
		<div class="q-gutter-md row items-start q-mr-sm">
			<q-input 
				outlined
				v-model="searchString"
				label="Produkt/Stav"
				:dense="dense"
				@keyup.enter="reloadData"
				style="width: 200px">

				<template v-slot:prepend>
					<q-icon name="search" />
				</template>
			</q-input>			
		</div>

		<!-- =================================================================== -->
		<!-- input search -->
		<!-- =================================================================== -->
		<div class="q-gutter-sm row items-start q-mb-sm">
			<q-input 
				outlined
				v-model="searchString_2" 
				label="Meno/Mobil"
				:dense="dense"
				@keyup.enter="reloadData"
				style="width: 200px">

				<template v-slot:prepend>
					<q-icon name="search" />
				</template>
			</q-input>			
		</div>

		<!-- =================================================================== -->
		<!-- check poznamka -->
		<!-- =================================================================== -->
		<div class="row q-mg-sm">
			<div class="q-gutter-sm">
				<q-checkbox 
				v-model="checkPoznamka" 
				label="Vyhľadať produkt v poznámke"  />
			</div>
		</div>

		<!-- =================================================================== -->
		<!-- input search, class = hide -->
		<!-- =================================================================== -->
		<div class="q-gutter-md row items-start hide">
			<q-input 
				outlined
				v-model="searchString_3" 
				label="Mobil"
				@keyup.enter="reloadData"
				:dense="dense"				
				style="width: 200px">

				<template v-slot:prepend>
					<q-icon name="search" />
				</template>
			</q-input>			
		</div>

		<q-space />

		<!-- =================================================================== -->
		<!-- select mesto -->
		<!-- =================================================================== -->
		<div class="q-pl-sm">
			<q-select
				label="Mesto"			
				ref="mesto"
        transition-show="flip-up"
        transition-hide="flip-down"
        outlined
        v-model="mesto_select"
        :options="options"
				@input="selectMesto()"
        style="width: 250px">
				<template v-slot:prepend>
					<q-icon name="place" />
				</template>
			</q-select>
		</div>	

	</div>

	<!-- =================================================================== -->
	<!-- table -->
	<!-- =================================================================== -->
	<div v-if="table_items.length > 0">	
		<table class="table">
			<tr>
				<th style="text-align: left;">Dátum</th>
				<th style="text-align: left;">Meno</th>
				<th style="text-align: left;">Stav</th>
				<th style="text-align: left;">Produkty</th>
				<th style="text-align: left;">Poznamka</th>	
			</tr>
			<tr 
				v-for="(item, index) in table_items"				
				:key="index"
				@click="selectItem(item)">

				<td>{{ dateToDMY(item.date_upg) }}</td>
				<td>{{ item.name_full }}</td>
				<td>{{ item.stav }}</td>
				<td>{{ item.produkt }}</td>
				<td>{{ item.poznamka }}</td>
			</tr>
		</table>
		<div class="popText">Počet riadkov: {{ table_items.length }}</div>
	</div>

	<q-dialog></q-dialog>

	<!-- =================================================================== -->
	<!-- contact dialog -->
	<!-- =================================================================== -->
	<div class="q-pa-md q-gutter-sm">
    <!-- <q-btn label="Maximized" color="primary" @click="dialogShow = true" /> -->

    <q-dialog
			persistent
      v-model="dialogShow"
      :maximized="maximizedToggle"
    >
      <q-card class="">
        <q-bar class="bg-primary text-white">

					<q-btn dense flat icon="save" class="" label="Uložiť" @click="saveChange()">
						<q-tooltip content-class="bg-white text-white bg-green">Uložiť</q-tooltip>
					</q-btn>

          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>			
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

				<!-- =================================================================== -->
				<!-- select sta  -->
				<!-- =================================================================== -->
        <q-card-section class="q-pt-none">
					<div class="text-h4 q-mt-sm">{{ selected_item.name_full }}</div>
					<div v-if="selected_item" class="text-h5">{{ phone }}</div>				

						<!-- stav, datum akcie -->
						<div class="row q-mt-sm">	

							<q-select
								label="Stav"
								outlined
								v-model="stav_select"
								:options="stav_opt"
								style="width: 300px">
							</q-select>					

							<q-input 							
								class="q-ml-xs"
								v-model="datum_akcie" 
								outlined 
								type="date"
								style="width: 160px">
							</q-input>	

						</div>		

						<select-products 
							:produkty="produkty"
							@updateProducts="produkty = $event"
						></select-products>

						<q-input 
							class="q-mt-xs"
							label="Poznamky"
							v-model="poznamka" 
							outlined 							
							type="textarea"
							style="width: 100%">
						</q-input>		

						<!-- <q-btn label="Uložiť"
							type="submit" 
							color="primary" 
							style="width: 150px; height: 35px;"
							@click="saveChange()"
							class="q-mt-xs q-md-xs">		
						</q-btn> -->

						<!-- historia -->
						<div v-if="data_h_select.length > 0">
							<div							
								v-for="(item, index) in data_h_select"				
								:key="index">												
								<div style="width: 30%; min-width: 450px;"><hr></div>
								<div>{{ dateToDMY_hhmm(item.date_upg) }}, {{ item.id_user }}, <b>{{ item.stav }}</b></div>
								<div v-if="item.produkt"><b>Produkty: </b>{{ item.produkt }}</div>
								<div v-if="item.poznamka"><b>Poznámky: </b>{{ item.poznamka }}</div>
							</div>
						</div>
					
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

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
			checkPoznamka: false,
			stav_select: '',
			datum_akcie: '',
			produkty: '',
			poznamka: '',
			phone: '',
			maximizedToggle: false,
			dialogShow: false,
			stav_opt: ['vyzváňal', 'nedostupný', 'číslo neexistuje','nemá záujem',
				'nemá záujem - starobný dôchodca','kontaktovať inokedy','dohodnuté stretnutie',
				'nekontaktovať','nekontaktovať - osobný blacklist','potenciálny pohovor','klient'],
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
			data_h: [],
			data_h_select: [],
			selected_item: {

			},
			selected_item_h: ''
		}
	},
	//===================================================================================================
	// methods
	//===================================================================================================
	methods: {
		//=======================================================================
		// select item
		//=======================================================================
		saveChange(){
			if(this.stav_select == ""){
				this.showAlert('Je potrebné vybrať "Stav".')
				return false
			}
			if(this.stav_select == "kontaktovať inokedy" || this.stav_select == "dohodnuté stretnutie"){			
				if(this.datum_akcie == "0000-00-00"){
					this.showAlert('Je potrebné vybrať dátum kontaktu/stretutia.')
					return false
				}
			}

			Loading.show({ spinner: QSpinnerGears })
			let dataUser = this.$store.state.app.appData.dataUser
			axios.post('https://app-44.herokuapp.com/api/call-page/update', {
				dataUser: dataUser,
				dataContact: {
					id_string: this.selected_item.id_string,
					id_user: this.$store.state.app.appData.userName,
					stav: this.stav_select,
					date_akcia: this.dateToYMD(this.datum_akcie),
					date_upg: this.dateToYMD_hhmmss(new Date()),
					produkt: this.produkty,
					poznamka: this.poznamka
				}
			}).then((response) => {
				if(response.data == true){
					this.reloadData()
					this.dialogShow = false
				}
				else this.showAlert('Error...')
			})
			
		},		
		//=======================================================================
		// reload
		//=======================================================================
		reloadData(){
			if(this.mesto_select.length == 0){
				this.$q.dialog({
					title: 'Call-Page',
					message: 'Je potrebne vybrať "Mesto"',
					ok: { color: 'primary' },
					cancel: { color: 'negative' }
				})
				return false
			}
			Loading.show({ spinner: QSpinnerGears })
			let dataUser = this.$store.state.app.appData.dataUser			
			axios.post("https://app-44.herokuapp.com/api/call-page/custom-data", {
			// axios.post("/api/call-page/custom-data", {
				dataUser: dataUser,
				poznamka: this.checkPoznamka,
				dataContact: {
					mesta: this.mesto_select,
					searchString: this.searchString,
					searchString_2: this.searchString_2,				
					searchString_3: this.searchString_3
				}
			}).then((response) => {
				Loading.hide()
				if(response.data == 'logout'){
					this.$store.commit('logout')
				}
				else if(response.data == '<>'){
					this.showAlert('Na pužitie tejto sekcie nie sú splnené podmienky.')
					return
				}
				else {				
					this.data_h = []
					this.table_items = []
					this.table_items = response.data.data
					this.data_h = response.data.data_h
				}
			})
		},		
		//=======================================================================
		// select item
		//=======================================================================
		selectItem(item){			
			this.selected_item = item
			this.stav_select = ''
			this.datum_akcie = '0000-00-00'
			this.produkty = ''
			this.poznamka = ''
			this.phone = this.formatPhone(item.phone)
			this.showHistory(item.phone)
			this.dialogShow = true
		},
		showHistory(phone){
			this.data_h_select = []
			for(let i = 0; i < this.data_h.length; i++){
				if(phone == this.data_h[i].phone){
					this.data_h_select.push(this.data_h[i])
				}
			}
		},
		//=======================================================================
		// format date dd.mm.yyyy
		//=======================================================================
		dateToDMY(date) {
			if(date == "" || date == " "){
				return "";
			}
			var datum =  new Date(date);
			var d = datum.getDate();
			var m = datum.getMonth() + 1; //Month from 0 to 11
			var y = datum.getFullYear();
			let result = '' + (d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y
			if(result == 'NaN.NaN.NaN') result = ''
			return result
		},
		//=======================================================================
		// showAlert
		//=======================================================================
		showAlert(msg) {
			this.$q.dialog({
				title: 'Call-Page',
				message: msg,
				ok: { color: 'primary' },
				cancel: { color: 'negative' }
			})
			return false
		},
		//=======================================================================
		// Date formar - YYYY-MM-DD hh:mm
		//=======================================================================
		dateToDMY_hhmm(date) {
			let datum =  new Date(date)
			let min = datum.getMinutes()
			let hod = datum.getHours()
			let d = datum.getDate()
			let m = datum.getMonth() + 1; //Month from 0 to 11
			let y = datum.getFullYear()
			let result = '' + (d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y
			result += ' ' + (hod <= 9 ? '0' + hod : hod) + ':' + (min <= 9 ? '0' + min : min)
			return result			
		},
		//=======================================================================
		// Date formar - YYYY-MM-DD hh:mm:ss
		//=======================================================================
		dateToYMD_hhmmss(date) {
			let datum =  new Date(date)
			let sec = datum.getSeconds()
			let min = datum.getMinutes()
			let hod = datum.getHours()
			let d = datum.getDate()
			let m = datum.getMonth() + 1; //Month from 0 to 11
			let y = datum.getFullYear()
			let result = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)
			result += ' ' + (hod <= 9 ? '0' + hod : hod) + ':' + (min <= 9 ? '0' + min : min) + ':' + (sec <= 9 ? '0' + sec : sec) 
			return result			
		},
		//=======================================================================
		// Date formar - YYYY-MM-DD
		//=======================================================================
		dateToYMD(date) {
			let datum =  new Date(date)
			let d = datum.getDate()
			let m = datum.getMonth() + 1; //Month from 0 to 11
			let y = datum.getFullYear()
			let result = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)
			if(result == "NaN-NaN-NaN") result = "0000-00-00"
			return result			
		},
		//=======================================================================
		// format phone
		//=======================================================================
		formatPhone(str) {
			let p = str[0]
			p += str[1]
			p += str[2]
			p += str[3]
			p += "-"
			p += str[4]
			p += str[5]
			p += str[6]
			p += "-"
			p += str[7]
			p += str[8]
			p += str[9]
			return p
		},
		selectMesto(){
			this.$store.commit('updateMestoSelect', this.mesto_select)
			this.reloadData()
		},
	},	
	mounted(){
		let string = this.$store.state.app.appData.dataUser.cp_mesta
		string = string.replace(/'/gi, "");
		let array = string.split(",")		
		this.options = array
		let storeMesto = this.$store.state.app.appData.mestoSelect
		if(storeMesto != undefined){
			this.mesto_select = storeMesto
		}else{
			this.$nextTick(() => {
				this.$refs.mesto.focus()
			});
		}
	},
	//===================================================================================================
	// components
	//===================================================================================================
	components: {
		'select-products': require('components/CallPage/SelectProdukts').default,
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
	.text-align-left {
		text-align: left;
	}
	.popText{
		font-size: 13px;
		color: #8c8c8c;
  }
	.hide {
		display: none;
	}
</style>