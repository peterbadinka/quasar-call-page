export default {
	state: {
		appData: {			
			access: false,
			userName: '',  
			key_api: '',
			mestoSelect: '',
			dataUser: []
		}
	},
	mutations: {	
		updateMestoSelect(state, payload) {
			state.appData.mestoSelect = payload
		},	
		login(state, payload) {
			state.appData = payload;
		},
		logout(state) {
			state.appData.access = false;
		}
	}
}
