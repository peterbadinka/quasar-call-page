export default {
	state: {
		contacts: [],
		filters: {
			filterDateValue: '-',
			filterDataOptions: [
				'-',
				'<= dnes',
				'<= dnes + 7 dní',
				'<= dnes + 30 dní',
			],
		}
	},
	mutations: {
		databazaChangeFilterDate(state, payload) {
			state.filters.filterDateValue = payload;
		},
		databazaSaveContacts(state, payload) {
			state.contacts = payload;
		}
	}
}