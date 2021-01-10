import { login } from "app/server/controllers/LoginController"

export default {
	state: {
		appData: {
			access: false,
			key_api: null,
			data: null
		}
	},
	mutations: {
		changeMsg(state, msg) {			
			state.msg = msg
			console.log("store-test")			
		},
		login(state, payload) {
			state.appData = payload;
		}
	}
}
