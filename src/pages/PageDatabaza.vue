<template>
	<q-page class="q-pa-sm">

		<!-- row -->
		<div class="row">	

			<!-- reload -->
			<q-btn label=""
				type="submit" 
				color="primary"
				class="q-mr-sm"
				@click="reloadData()">
				<q-icon name="cached" />
			</q-btn>

			<!-- add -->
			<q-btn color="primary" icon="add" class="q-mr-sm" style="display: none;" />	

			<!-- filter - datum akcie -->
			<q-select
				outlined			
				style="width: 200px;"
				label="Dátum akcie"					
				v-model="filterDateValue"
				@input="reloadData()"
				:options="$store.state.databaza.filters.filterDataOptions"
			/>

			<!-- input search -->
			<q-input 
					outlined 	
					v-model="search" 
					label="Vyhľadať"
					class="q-ml-sm"
					style="width: 300px;"
					v-if="contacts.length > 0">
					<template v-slot:prepend>
						<q-icon name="search" />
					</template>
			</q-input>

		</div>

		<!-- Table databaza -->
		<div v-if="contacts.length > 0">
			<table class="table q-mt-sm">
				<tr>
					<th>Meno</th>
					<th>Dátum</th>
					<th>Stav</th>
					<th>Okres</th>
				</tr>
				<tr 
					v-for="row in rows"
					:key="row.id_person"
					@click="showContact(row)">
					<td>{{ row.name_full }}</td>
					<td>{{ dateToDMY(row.datum_akcie) }}</td>
					<td>{{ row.stav }}</td>
					<td>{{ row.okres }}</td>
				</tr>
			</table>
			<div class="popText">Počet riadkov: {{ contacts.length }}</div>
		</div>

		<!-- dialog edit contacts -->
		<div class="q-pa-sm">

			<q-dialog
				persistent
				v-model="dialog"
				:maximized="maximizedToggle"
			>
				<q-card>
					<q-bar class="bg-primary text-white">

						<q-btn dense flat icon="save" class="" label="Uložiť" @click="saveContact()">
							<q-tooltip content-class="bg-white text-white bg-green">Uložiť</q-tooltip>
						</q-btn>

						<q-space />

						<q-btn dense flat icon="delete" class="" label="Vymazať" @click="deleteContact()">
							<q-tooltip content-class="bg-white text-white bg-red">Vymazať</q-tooltip>
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

					<!-- body -->
					<q-card-section class="q-pt-none">

						<div class="row q-mt-md">

							<!-- meno -->
							<q-input 
								outlined 
								label="Meno"														
								style="width: 300px;"
								v-model="contactSelect.name_full"
							/>

							<!-- mobil -->
								<q-input 
									outlined 
									label="Mobil" 
									class="q-ml-xs"								
									style="width: 196px;"
									v-model="contactSelect.phone"
								/>

						</div>
						
						<div class="row">		

							<!-- Email -->
							<q-input 
								outlined 
								label="Email"
								class="q-mt-xs q-mr-xs"														
								style="width: 300px;"
								v-model="contactSelect.email"
							/>

							<!-- datum akcie -->
							<q-input
								outlined 
								type="date"
								class="q-mt-xs"
								style="width: 196px"
								title="Dátum akcie"
								v-model="contactSelect.datum_akcie">
							</q-input>
						</div>

						<!-- stav -->
						<q-input 
							outlined 
							label="Stav"
							class="q-mt-xs"
							style="width: 100%;"
							:title="contactSelect.stav"
							v-model="contactSelect.stav"
						/>

						<!-- poznamka -->
						<q-input 
							outlined 
							label="Poznámky"
							type="textarea"
							class="q-mt-xs"
							rows="15"
							style="width: 100%px;"
							v-model="contactSelect.poznamka"
						/>

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
	// DATA
	data: () => ({
		search: null,
		filterDateValue: null,
		contacts: [],
		contactSelect: {},
		dialog: false,
		maximizedToggle: false,
	}),
	// METHODS
	methods: {
		// reloadData
		reloadData() {
			Loading.show({ spinner: QSpinnerGears })
			this.$store.commit('databazaChangeFilterDate', this.filterDateValue)
			axios.post('https://app-44.herokuapp.com/api/databaza/get-contacts', {
			// axios.post('/api/databaza/get-contacts', {
				dataUser: this.$store.state.app.appData.dataUser,
				filterDate: this.filterDateValue
			}).then(response => {
				Loading.hide()
				if(response.data == 'logout'){
					this.$store.commit('logout')
				}
				if(response.data.err != null) {this.showAlert('Error...'); return}
				this.contacts = response.data.data
				this.$store.commit('databazaSaveContacts', response.data.data)	
			})			
		},
		// showContact
		showContact(row) {
			this.contactSelect = JSON.parse(JSON.stringify(row));
			this.contactSelect.datum_akcie = this.dateToYMD(row.datum_akcie)
			this.dialog = true
		},
		// saveContact
		saveContact() {	
			Loading.show({ spinner: QSpinnerGears })		
			axios.post('/api/databaza/set-contact', {
				dataUser: this.$store.state.app.appData.dataUser,
				dataContact: {
					id_user: this.contactSelect.id_user,
					id_person: this.contactSelect.id_person,
					date_upg: this.dateToYMD(new Date()),
					name_full: this.contactSelect.name_full,
					phone: this.contactSelect.phone,
					email: this.contactSelect.email,
					datum_akcie: this.contactSelect.datum_akcie,					
					stav: this.contactSelect.stav,
					poznamka: this.contactSelect.poznamka
				}
			}).then(response => {
				this.reloadData()
				console.log(response.data)
			})
		},
		// deleteContact
		deleteContact() {
			Loading.show({ spinner: QSpinnerGears })		
			axios.post('/api/databaza/delete-contact', {
				dataUser: this.$store.state.app.appData.dataUser,
				dataContact: {
					id_user: this.contactSelect.id_user,
					id_person: this.contactSelect.id_person,
					date_upg: this.dateToYMD(new Date()),
					name_full: this.contactSelect.name_full,
					phone: this.contactSelect.phone,
					email: this.contactSelect.email,
					datum_akcie: this.contactSelect.datum_akcie,					
					stav: this.contactSelect.stav,
					poznamka: this.contactSelect.poznamka,
					check_delete: 'ok',
				}
			}).then(response => {
				this.reloadData()
				console.log(response.data)
			})
		},
		// showAlert
		showAlert(msg) {
			this.$q.dialog({
				title: 'Call-Page',
				message: msg,
				ok: { color: 'primary' },
				cancel: { color: 'negative' }
			})
			return false
		},
		// dateToDMY
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
		// datetoYMD
		dateToYMD(date) {
			let datum =  new Date(date)
			let d = datum.getDate()
			let m = datum.getMonth() + 1; //Month from 0 to 11
			let y = datum.getFullYear()
			let result = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)
			if(result == "NaN-NaN-NaN") result = "0000-00-00"
			return result
		},
	},		
	// COMPUTED
	computed: {
    cols () {
      return this.contacts.length >= 1 ? Object.keys(this.contacts[0]) : []
    },
    rows () {
      if (!this.contacts.length) {
        return []
      }
      return this.contacts.filter(item => {
        let props = Object.values(item)
        return props.some(prop => !this.search || ((typeof prop === 'string') ? prop.includes(this.search) : prop.toString(10).includes(this.search)))
      })
    }
  },
	mounted() {
		this.filterDateValue = this.$store.state.databaza.filters.filterDateValue
		if(this.$store.state.databaza.contacts.length == 0) {
			this.reloadData()
		} else {
			this.contacts = this.$store.state.databaza.contacts
		}
	},
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
		text-align: left;
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