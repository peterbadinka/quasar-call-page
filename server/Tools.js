class Tools {

	//=======================================================================
	// DB update
	//=======================================================================
	static sqlUpdateGen(tableName, json){

		let sql = "UPDATE "+tableName+" SET"
		for (var key in json) {
			if (json.hasOwnProperty(key)) {
				sql += " "+key+" = '"+json[key]+"',"
			}
		}
		sql = sql.substring(0, sql.length - 1)
		sql += " WHERE id_person = '"+json.id_person+"'"
		sql += " LIMIT 1"

		return sql

	}

	//=======================================================================
	// jsonToarray
	//=======================================================================
	static jsonToarray(json){

    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
		return result;
		
	}

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
	// Date formar - YYYY-MM-DD
	//=======================================================================
	static dateToYMD(date) {
 
		let datum =  new Date(date)
    let d = datum.getDate()
    let m = datum.getMonth() + 1; //Month from 0 to 11
		let y = datum.getFullYear()

		let result = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)
		if(result == "NaN-NaN-NaN") result = "0000-00-00"

		return result
		
	}

	//=======================================================================
	// Date formar - YYYY-MM-DD hh:mm:ss
	//=======================================================================
	static dateToYMD_hhmmss(date) {
 
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

	//=======================================================================
	// Format phone {only numbers}
	//=======================================================================
	static formatPhone(_p) {
		let phone = ''
		for(var i = 0; i < _p.length; i++){
			let p = _p[i].toString()
			if(p == '0' || p == '1' || p == '2' || p == '3' || p == '4' || p == '5' || p == '6' || p == '7' || p == '8' || p == '9'){
				phone += p
			}
		}
		return phone
	}

}

module.exports = Tools