class Tools {

	//=======================================================================
	// Random string / ID
	//=======================================================================
	static randString(length){

		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			 result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result + this.customDate()

	}

	//=======================================================================
	// Date formar - YYYY-MM-DD hh:mm:ss
	//=======================================================================
	static dateToYMD_hhmmss() {
 
		let datum =  new Date()
		let sec = datum.getSeconds()
		let min = datum.getMinutes()
		let hod = datum.getHours()
    let d = datum.getDate()
    let m = datum.getMonth() + 1; //Month from 0 to 11
		let y = datum.getFullYear()

		let result = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)
		result += ' ' + (hod <= 9 ? '0' + hod : hod) + ':' + (min <= 9 ? '0' + min : min) + ':' + (sec <= 9 ? '0' + sec : sec) 

		return result
		
	}

	//=======================================================================
	// Custom date
	//=======================================================================
	static customDate() {

		let datum =  new Date()
		let mil = datum.getMilliseconds().toString()
		let sec = datum.getSeconds()
		let min = datum.getMinutes()
		let hod = datum.getHours()
		let d = datum.getDate()
		let m = datum.getMonth() + 1; //Month from 0 to 11
		let y = datum.getFullYear()

		let result = "_" + y + (m<=9 ? '0' + m : m).toString() + (d <= 9 ? '0' + d : d).toString() + (hod <= 9 ? '0' + hod : hod).toString()
		result += (min <= 9 ? '0' + min : min).toString() + (sec <= 9 ? '0' + sec : sec).toString() + (mil <= 9 ? '0' + mil : mil).toString()
		
		return result

	}

}

module.exports = Tools