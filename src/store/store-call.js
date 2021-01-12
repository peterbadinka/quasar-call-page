export default {
	state: {
		callPageData: {
			showDialog: false
		}
	},
	mutations: {
		showDialog(state) {
			state.showDialog = !state.showDialog
			console.log("showDialog(state)")			
		},
		login(state, payload) {
			state.appData = payload;
		}
	}
}