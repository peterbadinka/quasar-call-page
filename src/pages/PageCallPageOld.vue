<template>
	<q-page padding>
		<div class="row">

			<!-- btn new -->
			<q-btn label=""
				type="submit" 
				color="primary" 
				style="width: 200px"
				class="q-mr-md"
				@click="newContact">
				<div class="row">
					<q-icon name="get_app" class="q-pr-sm" />
					Nový kontakt
				</div>				
			</q-btn>
		
			<!-- btn send -->
			<q-btn label=""
				type="submit" 
				color="primary" 
				style="width: 200px;"
				class="q-mr-md"
				@click="sendCotnact">
				<div class="row">
					<q-icon name="send" class="q-pr-sm" />
					Odoslať kontakt
				</div>				
			</q-btn>	

			<!-- select mesto -->
			<q-select
				class=""
				label="Mesto"			
				ref="mesto"
				transition-show="flip-up"
				transition-hide="flip-down"
				filled
				v-model="mesto_select"
				:options="options"
				style="width: 250px;">
				<template v-slot:prepend>
					<q-icon name="place" />
				</template>
			</q-select>		

		</div>
		
			<div class="row text-h4 q-mt-sm">{{ new_contact.name_full }}</div>
			<div class="row text-h5 q-mb-sm">{{ new_contact.phone }}</div>

		<div class="row">
			<!-- select stav  -->
			<q-select
				label="Stav"
				filled
				v-model="stav_select"
				:options="stav_opt"
				class="q-mr-xs"
				style="width: 320px;">
			</q-select>	

			<!-- datum akcie  -->
			<q-input 							
				class=""
				v-model="datum_akcie" 
				filled 
				type="date"
				style="width: 180px">
			</q-input>

		</div>

		<!-- select products  -->
		<select-products 
			:produkty="produkty"
			@updateProducts="produkty = $event"
		></select-products>

		<!-- poznamka  -->
		<q-input 
			class="q-mt-xs"
			label="Poznamky"
			v-model="poznamka" 
			filled 
			type="textarea"
			style="width: 100%">
		</q-input>

		<div class="row">
			<!-- historia -->		
			<table class="table q-mt-md q-mb-md" v-if="data_h_select.length > 0">	
				<tr 
					v-for="(item, index) in data_h_select"
					:key="index">
					<td>{{ dateToDMY_hhmm(item.date_upg) }}</td>
					<td>{{ item.id_user }}</td>
					<td>{{ item.stav }}</td>
					<td>{{ item.produkt }}</td>
					<td>{{ item.poznamka }}</td>
				</tr>
			</table>
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

	</q-page>
</template>

<script>
import axios from 'axios'
import { Loading, QSpinnerGears } from 'quasar'

export default {
	data() {
		return {
			new_contact: {},
			new_contact_send: true,

			mesto_select: '',
			options: [],
			selected_item: {
				name_full: '',
			},
			phone: '',
			stav_select: '',
			stav_opt: ['vyzváňal', 'nedostupný', 'číslo neexistuje','nemá záujem',
				'nemá záujem - starobný dôchodca','kontaktovať inokedy','dohodnuté stretnutie',
				'nekontaktovať','nekontaktovať - osobný blacklist','potenciálny pohovor','klient'],
			table_items: [],
			datum_akcie: '',
			produkty: '',
			poznamka: '',
			data_h_select: [],
		}
	},
	methods: {
		newContact(){
			let dataUser = this.$store.state.app.appData.dataUser
			axios.post('https://app-44.herokuapp.com/api/call-page/new-contact', {
				dataUser: dataUser,
				okres: this.mesto_select
			}).then((response) => {
				this.new_contact = response.data.newContact
			})
		},
		sendCotnact(){
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

			// Loading.show({ spinner: QSpinnerGears })
			let dataUser = this.$store.state.app.appData.dataUser
			axios.post('https://app-44.herokuapp.com/api/call-page/update-new', {
				dataUser: dataUser,
				dataContact: {
					id_string: this.new_contact.id_string,
					id_user: this.$store.state.app.appData.userName,
					stav: this.stav_select,
					date_akcia: this.dateToYMD(this.datum_akcie),
					date_upg: this.dateToYMD_hhmmss(new Date()),
					produkt: this.produkty,
					poznamka: this.poznamka
				}
			}).then((response) => {				
				if(response.data == true){
					// this.reloadData()
					// this.dialogShow = false
				}
				else this.showAlert('Error...')
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
		//=======================================================================
		// Savev change
		//=======================================================================
		saveChange(){

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
		}
	},
	mounted(){
		let string = this.$store.state.app.appData.dataUser.cp_mesta
		string = string.replace(/'/gi, "");
		let array = string.split(",")		
		this.options = array
		this.$nextTick(() => {
			this.$refs.mesto.focus()
		});
	},
	components: {
		'select-products': require('components/CallPage/SelectProdukts').default
	}
}
</script>

<style>

</style>