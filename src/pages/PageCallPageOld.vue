<template>
	<q-page class="q-pa-sm">
		<div class="row q-mb-sm">

			<!-- btn new -->
			<q-btn label=""
				type="submit" 
				color="primary" 
				style="width: 200px"
				class="q-mr-sm"
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
				class="q-mr-sm"
				@click="sendCotnact">
				<div class="row">
					<q-icon name="send" class="q-pr-sm" />
					Odoslať kontakt
				</div>				
			</q-btn>	

			<q-space />

			<!-- select mesto -->
			<q-select
				class=""
				label="Mesto"
				ref="mesto"
				transition-show="flip-up"
				transition-hide="flip-down"
				outlined
				v-model="mesto_select"				
				:options="options_m"
				@input="selectMesto()"
				style="width: 250px;">
				<template v-slot:prepend>
					<q-icon name="place" />
				</template>
			</q-select>

		</div>
		
		<!-- name, phone -->
		<div v-if="new_contact.name_full != undefined">
			<div class="row text-h4">{{ new_contact.name_full }} ({{ cp_contact_count }})</div>
			<div class="row text-h5">{{ phone }}</div>
		</div>

		<!-- stav, datum akcie -->
		<div class="row q-mt-sm">

			<q-select
				label="Stav"
				outlined
				v-model="stav_select"
				:options="stav_opt"
				class="q-mr-xs"
				style="width: 320px;">
			</q-select>	
	
			<q-input 							
				class=""
				v-model="datum_akcie"
				outlined 
				type="date"
				style="width: 180px">
			</q-input>

		</div>

		<!-- select products  -->
		<div class="">
			<div class="q-mt-xs">
				<q-select
						outlined
						use-chips
						v-model="produkty"
						:options="options"
						label="Produkty"
						multiple
						emit-value
						map-options
						style="width: 100%"
						:value="produkty"
				>
					<template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
						<q-item
							v-bind="itemProps"
							v-on="itemEvents"
						>
							<q-item-section>
								<q-item-label v-html="opt.label" ></q-item-label>
							</q-item-section>
							<q-item-section side>
								<q-toggle :value="selected" @input="toggleOption(opt)" />
							</q-item-section>
						</q-item>
					</template>
				</q-select>
			</div>
		</div>

		<!-- poznamka  -->
		<q-input 
			class="q-mt-xs"
			label="Poznamky"
			v-model="poznamka" 
			outlined 
			type="textarea"
			style="width: 100%">
		</q-input>

		<!-- historia -->		
		<div class="row">			
			<table class="table q-mt-md" v-if="data_h_select.length > 0">	
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

		<!-- historia -->
		<div v-if="table_items_h.length > 0" class="q-mt-md">
			<div							
				v-for="(item, index) in table_items_h"				
				:key="index">												
				<div style="width: 30%; min-width: 450px;"><hr></div>
				<div>{{ dateToDMY_hhmm(item.date_upg) }}, {{ item.id_user }}, <b>{{ item.stav }}</b></div>
				<div v-if="item.produkt"><b>Produkty: </b>{{ item.produkt }}</div>
				<div v-if="item.poznamka"><b>Poznámky: </b>{{ item.poznamka }}</div>
			</div>
		</div>

		<div class="row q-mt-md q-mb-xs">
			<!-- =================================================================== -->
			<!-- btn reload -->
			<!-- =================================================================== -->
			<q-btn label=""
				type="submit" 
				color="primary" 
				style="width: 54px; height: 54px;"
				@click="reloadData"
				class="">
				<q-icon name="cached" />
			</q-btn>

			<!-- input search -->
			<q-input 
					outlined 	
					v-model="search" 
					label="Vyhľadať"
					class="q-ml-sm"
					style="width: 400px;"
					v-if="call_h.length > 0">

					<template v-slot:prepend>
						<q-icon name="search" />
					</template>
			</q-input>
		</div>

		<!-- =================================================================== -->
		<!-- table / historia volani -->
		<!-- =================================================================== -->
		<div v-if="call_h.length > 0">	
			<table class="table">
				<tr>
					<th style="text-align: left;">Dátum</th>
					<th style="text-align: left;">Meno</th>
					<th style="text-align: left;" class="hide">Mobil</th>
					<th style="text-align: left;">Stav</th>
					<th style="text-align: left;">Produkty</th>
					<th style="text-align: left;">Poznamka</th>
					<th style="text-align: left;">Mesto</th>	
				</tr>
				<tr 
					v-for="row in rows"
					:key="row.id_string"
					@click="selectItem(row)">

					<td>{{ dateToDMY(row.date_upg) }}</td>
					<td>{{ row.name_full }}</td>
					<td class="hide">{{ row.phone }}</td>
					<td>{{ row.stav }}</td>
					<td>{{ row.produkt }}</td>
					<td>{{ row.poznamka }}</td>
					<td>{{ row.okres }}</td>
				</tr>
			</table>
			<div class="popText">Počet riadkov: {{ call_h.length }}</div>
		</div>

		<!-- =================================================================== -->
		<!-- dialog edit -->
		<!-- =================================================================== -->
		<div class="q-pa-sm q-gutter-sm">

			<q-dialog
				persistent
				v-model="dialogEdit"
				:maximized="maximizedToggle"
			>
				<q-card>
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
					<!-- body -->
					<!-- =================================================================== -->
					<q-card-section class="q-pt-none q-mt-sm">
						
						<!-- name, phone -->
						<div v-if="dataCall.name_full != undefined" class="q-mt-sm">
							<div class="row text-h4">{{ dataCall.name_full }}</div>
							<div class="row text-h5">{{ dataCallPhone }}</div>
						</div>

						<!-- stav, datum akcie -->
						<div class="row q-mt-sm">	

							<q-select
								label="Stav"
								outlined
								v-model="dataCall.stav"
								:options="stav_opt"
								class="q-mr-xs"
								style="width: 300px;">
							</q-select>

							<q-input 							
								class=""
								v-model="dataCall.date_akcia"
								outlined 
								type="date"
								style="width: 160px">
							</q-input>

						</div>

						<!-- select products  -->
						<div class="">
							<div class="q-mt-xs">
								<q-select
										outlined
										use-chips
										v-model="dataCallProdukty"
										:options="options"
										label="Produkty"
										multiple
										emit-value
										map-options
										style="width: 100%"
										:value="produkty"
								>
									<template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
										<q-item
											v-bind="itemProps"
											v-on="itemEvents"
										>
											<q-item-section>
												<q-item-label v-html="opt.label" ></q-item-label>
											</q-item-section>
											<q-item-section side>
												<q-toggle :value="selected" @input="toggleOption(opt)" />
											</q-item-section>
										</q-item>
									</template>
								</q-select>
							</div>
						</div>

						<!-- poznamka  -->
						<q-input 
							class="q-mt-xs"
							label="Poznamky"
							v-model="dataCallPoznamka" 
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
						<div v-if="dataCallHistSelect.length > 0">
							<div							
								v-for="(item, index) in dataCallHistSelect"				
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
			cp_contact_count: '',
			produkty: [],

			mesto_select: '',
			options: [
				{ label: 'Dôchodok - 2. pilier', value: 'Dôchodok - 2. pilier' },{ label: 'Dôchodok - 3. pilier', value: 'Dôchodok - 3. pilier' },{ label: 'Investícia - Podielové fondy', value: 'Investícia - Podielové fondy' },{ label: 'Investícia - Sporiaci účet', value: 'Investícia - Sporiaci účet' },{ label: 'Poistenie - Bytu', value: 'Poistenie - Bytu' },{ label: 'Poistenie - Domácnosti', value: 'Poistenie - Domácnosti' },{ label: 'Poistenie - Domu', value: 'Poistenie - Domu' },{ label: 'Poistenie - Havarijné (HP)', value: 'Poistenie - Havarijné (HP)' },{ label: 'Poistenie - Investičné životné (IŽP)', value: 'Poistenie - Investičné životné (IŽP)' },{ label: 'Poistenie - Kapitalové (KŽP)', value: 'Poistenie - Kapitalové (KŽP)' },{ label: 'Poistenie - Majetku', value: 'Poistenie - Majetku' },{ label: 'Poistenie - Rizikové', value: 'Poistenie - Rizikové' },{ label: 'Poistenie - Úrazové', value: 'Poistenie - Úrazové' },{ label: 'Poistenie - Zákonné (PZP)', value: 'Poistenie - Zákonné (PZP)' },{ label: 'Poistenie - Životné (ŽP)', value: 'Poistenie - Životné (ŽP)' },{ label: 'Úver - Hypotekárny', value: 'Úver - Hypotekárny' },{ label: 'Úver - Leasing', value: 'Úver - Leasing' },{ label: 'Úver - Nebankové pôžičky', value: 'Úver - Nebankové pôžičky' },{ label: 'Úver - Spotrebný', value: 'Úver - Spotrebný' },
			],
			options_m: [],
			selected_item: {
				name_full: '',
			},
			phone: '',
			stav_select: '',
			stav_opt: ['vyzváňal', 'nedostupný', 'číslo neexistuje','nemá záujem',
				'nemá záujem - starobný dôchodca','kontaktovať inokedy','dohodnuté stretnutie',
				'nekontaktovať','nekontaktovať - osobný blacklist','potenciálny pohovor','klient'],
			table_items_h: [],
			table_items: [],
			datum_akcie: '',			
			poznamka: '',
			data_h_select: [],
			call_h: [],

			dialogEdit: false,			
			maximizedToggle: false,
			dataCall: {},
			dataCallHist: [],
			dataCallHistSelect: [],
			dataCallPhone: [],
			dataCallProdukty: [],
			dataCallPoznamka: '',

			search: null,
			column: null,
			items: [],
		}
	},
	computed: {
    cols () {
      return this.call_h.length >= 1 ? Object.keys(this.call_h[0]) : []
    },
    rows () {
      if (!this.call_h.length) {
        return []
      }
      return this.call_h.filter(item => {
        let props = Object.values(item)
        return props.some(prop => !this.search || ((typeof prop === 'string') ? prop.includes(this.search) : prop.toString(10).includes(this.search)))
      })
    }
  },
	methods: {
		reloadData(){
			Loading.show({ spinner: QSpinnerGears })
			axios.post('https://app-44.herokuapp.com/api/call-page/get-history', {
				dataUser: this.$store.state.app.appData.dataUser
			}).then(response => {				
				this.call_h = response.data.data
				this.dataCallHist = response.data.data_h				
				Loading.hide()
			})
		},
		newContact(){
			if(this.new_contact.name_full != undefined) return;
			if(this.mesto_select.length < 4) {this.showAlert('Je potrebne vybrať "Mesto"'); return;}
			Loading.show({ spinner: QSpinnerGears })
			let dataUser = this.$store.state.app.appData.dataUser
			axios.post('https://app-44.herokuapp.com/api/call-page/new-contact', {
				dataUser: dataUser,
				okres: this.mesto_select
			}).then((response) => {
				if(response.data == 'logout'){
					Loading.hide()
					this.$store.commit('logout')
				}				 
				else{
					this.new_contact = response.data.newContact
					this.phone = this.formatPhone(response.data.newContact.phone)
					this.cp_contact_count = response.data.cp_contact_count
					this.stav_select = ''
					this.datum_akcie = '0000-00-00'
					this.produkty = []
					this.poznamka = ''
					this.table_items_h = response.data.newContact_h
					Loading.hide()
				}
			})
		},
		sendCotnact(){
			if(this.new_contact.name_full == undefined) return;
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
				Loading.hide()
				if(response.data == true){
					this.new_contact = {}
					this.stav_select = ''
					this.datum_akcie = '0000-00-00'
					this.produkty = []
					this.table_items_h = []
					this.poznamka = ''
					this.phone = ''
					Loading.hide()
				}
				else {
					Loading.hide()
					this.showAlert('Error...')	
				}
			})
		},		
		//=======================================================================
		// select item
		//=======================================================================
		selectItem(item){			
			this.dataCall = item			
			this.dataCall.date_akcia = this.dateToYMD(item.date_akcia)	
			this.dataCallPhone = this.formatPhone(item.phone)
			this.dataCallPoznamka = item.poznamka
			if(item.produkt.length > 0) this.dataCallProdukty = item.produkt.split(",")	
			else this.dataCallProdukty = []
			this.dialogEdit = true
			this.showHistory(item.phone)		
		},	
		// showHistory
		showHistory(phone){
			this.dataCallHistSelect = []
			for(let i = 0; i < this.dataCallHist.length; i++){
				if(phone == this.dataCallHist[i].phone){
					this.dataCallHistSelect.push(this.dataCallHist[i])
				}
			}
		},	
		//=======================================================================
		// Savev change
		//=======================================================================
		saveChange(){
			if(this.dataCall.stav == ""){
				this.showAlert('Je potrebné vybrať "Stav".')
				return false
			}
			if(this.dataCall.stav == "kontaktovať inokedy" || this.dataCall.stav == "dohodnuté stretnutie"){			
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
					id_string: this.dataCall.id_string,

					id_user: this.$store.state.app.appData.userName,
					stav: this.dataCall.stav,
					date_akcia: this.dateToYMD(this.dataCall.date_akcia),
					date_upg: this.dateToYMD_hhmmss(new Date()),
					produkt: this.dataCallProdukty,
					poznamka: this.dataCallPoznamka
				}
			}).then((response) => {
				if(response.data == true){
					this.reloadData()
					this.dialogEdit = false
				}
				else this.showAlert('Error...')
			})
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
		this.options_m = array
		let storeMesto = this.$store.state.app.appData.mestoSelect
		if(storeMesto != undefined){
			this.mesto_select = storeMesto
		}else{
			this.$nextTick(() => {
				this.$refs.mesto.focus()
			});
		}
	},
	components: {
		
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