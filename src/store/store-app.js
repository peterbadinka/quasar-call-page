export default {
	state: {
		appData: {			
			access: false,
			userName: '',  
			key_api: '',
			dataUser: []
		}
	},
	mutations: {
		changeMsg(state, msg) {			
			state.msg = msg
			console.log("store-test")			
		},
		login(state, payload) {
			state.appData = payload;
		},
		logout(state) {
			state.appData.access = false;
		}
	}
}
