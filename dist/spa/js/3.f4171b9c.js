(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"25f1":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("div",{staticClass:"row q-mb-md"},[a("q-btn",{staticClass:"q-mr-md",staticStyle:{width:"200px"},attrs:{label:"",type:"submit",color:"primary"},on:{click:t.newContact}},[a("div",{staticClass:"row"},[a("q-icon",{staticClass:"q-pr-sm",attrs:{name:"get_app"}}),t._v("\n\t\t\t\tNový kontakt\n\t\t\t")],1)]),a("q-btn",{staticClass:"q-mr-md",staticStyle:{width:"200px"},attrs:{label:"",type:"submit",color:"primary"},on:{click:t.sendCotnact}},[a("div",{staticClass:"row"},[a("q-icon",{staticClass:"q-pr-sm",attrs:{name:"send"}}),t._v("\n\t\t\t\tOdoslať kontakt\n\t\t\t")],1)]),a("q-select",{ref:"mesto",staticStyle:{width:"250px"},attrs:{label:"Mesto","transition-show":"flip-up","transition-hide":"flip-down",filled:"",options:t.options_m},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"place"}})]},proxy:!0}]),model:{value:t.mesto_select,callback:function(e){t.mesto_select=e},expression:"mesto_select"}})],1),void 0!=t.new_contact.name_full?a("div",[a("div",{staticClass:"row text-h4"},[t._v(t._s(t.new_contact.name_full)+" ("+t._s(t.cp_contact_count)+")")]),a("div",{staticClass:"row text-h5"},[t._v(t._s(t.phone))])]):t._e(),a("div",{staticClass:"row q-mt-sm"},[a("q-select",{staticClass:"q-mr-xs",staticStyle:{width:"320px"},attrs:{label:"Stav",filled:"",options:t.stav_opt},model:{value:t.stav_select,callback:function(e){t.stav_select=e},expression:"stav_select"}}),a("q-input",{staticStyle:{width:"180px"},attrs:{filled:"",type:"date"},model:{value:t.datum_akcie,callback:function(e){t.datum_akcie=e},expression:"datum_akcie"}})],1),a("div",{},[a("div",{staticClass:"q-mt-xs"},[a("q-select",{staticStyle:{width:"100%"},attrs:{filled:"",options:t.options,label:"Produkty",multiple:"","emit-value":"","map-options":"",value:t.produkty},scopedSlots:t._u([{key:"option",fn:function(e){var i=e.itemProps,o=e.itemEvents,s=e.opt,l=e.selected,n=e.toggleOption;return[a("q-item",t._g(t._b({},"q-item",i,!1),o),[a("q-item-section",[a("q-item-label",{domProps:{innerHTML:t._s(s.label)}})],1),a("q-item-section",{attrs:{side:""}},[a("q-toggle",{attrs:{value:l},on:{input:function(t){return n(s)}}})],1)],1)]}}]),model:{value:t.produkty,callback:function(e){t.produkty=e},expression:"produkty"}})],1)]),a("q-input",{staticClass:"q-mt-xs",staticStyle:{width:"100%"},attrs:{label:"Poznamky",filled:"",type:"textarea"},model:{value:t.poznamka,callback:function(e){t.poznamka=e},expression:"poznamka"}}),a("div",{staticClass:"row"},[t.data_h_select.length>0?a("table",{staticClass:"table q-mt-md q-mb-md"},t._l(t.data_h_select,(function(e,i){return a("tr",{key:i},[a("td",[t._v(t._s(t.dateToDMY_hhmm(e.date_upg)))]),a("td",[t._v(t._s(e.id_user))]),a("td",[t._v(t._s(e.stav))]),a("td",[t._v(t._s(e.produkt))]),a("td",[t._v(t._s(e.poznamka))])])})),0):t._e()]),t.table_items_h.length>0?a("table",{staticClass:"table q-mt-sm"},t._l(t.table_items_h,(function(e,i){return a("tr",{key:i},[a("td",[t._v(t._s(t.dateToDMY(e.date_upg)))]),a("td",[t._v(t._s(e.id_user))]),a("td",[t._v(t._s(e.stav))]),a("td",[t._v(t._s(e.produkt))]),a("td",[t._v(t._s(e.poznamka))])])})),0):t._e(),a("q-btn",{staticClass:"q-mt-sm",staticStyle:{width:"54px",height:"54px"},attrs:{label:"",type:"submit",color:"primary"},on:{click:t.reloadData}},[a("q-icon",{attrs:{name:"cached"}})],1),t.table_items.length>0?a("div",[a("table",{staticClass:"table"},[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("Dátum")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("Meno")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("Stav")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("Produkty")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("Poznamka")])]),t._l(t.table_items,(function(e,i){return a("tr",{key:i,on:{click:function(a){return t.selectItem(e)}}},[a("td",[t._v(t._s(t.dateToDMY(e.date_upg)))]),a("td",[t._v(t._s(e.name_full))]),a("td",[t._v(t._s(e.stav))]),a("td",[t._v(t._s(e.produkt))]),a("td",[t._v(t._s(e.poznamka))])])}))],2),a("div",{staticClass:"popText"},[t._v("Počet riadkov: "+t._s(t.table_items.length))])]):t._e(),a("q-dialog")],1)},o=[],s=(a("5319"),a("bc3a")),l=a.n(s),n=(a("f508"),a("cf57"),{data(){return{new_contact:{},new_contact_send:!0,cp_contact_count:"",produkty:[],mesto_select:"",options:[{label:"Dôchodok - 2. pilier",value:"Dôchodok - 2. pilier"},{label:"Dôchodok - 3. pilier",value:"Dôchodok - 3. pilier"},{label:"Investícia - Podielové fondy",value:"Investícia - Podielové fondy"},{label:"Investícia - Sporiaci účet",value:"Investícia - Sporiaci účet"},{label:"Poistenie - Bytu",value:"Poistenie - Bytu"},{label:"Poistenie - Domácnosti",value:"Poistenie - Domácnosti"},{label:"Poistenie - Domu",value:"Poistenie - Domu"},{label:"Poistenie - Havarijné (HP)",value:"Poistenie - Havarijné (HP)"},{label:"Poistenie - Investičné životné (IŽP)",value:"Poistenie - Investičné životné (IŽP)"},{label:"Poistenie - Kapitalové (KŽP)",value:"Poistenie - Kapitalové (KŽP)"},{label:"Poistenie - Majetku",value:"Poistenie - Majetku"},{label:"Poistenie - Rizikové",value:"Poistenie - Rizikové"},{label:"Poistenie - Úrazové",value:"Poistenie - Úrazové"},{label:"Poistenie - Zákonné (PZP)",value:"Poistenie - Zákonné (PZP)"},{label:"Poistenie - Životné (ŽP)",value:"Poistenie - Životné (ŽP)"},{label:"Úver - Hypotekárny",value:"Úver - Hypotekárny"},{label:"Úver - Leasing",value:"Úver - Leasing"},{label:"Úver - Nebankové pôžičky",value:"Úver - Nebankové pôžičky"},{label:"Úver - Spotrebný",value:"Úver - Spotrebný"}],options_m:[],selected_item:{name_full:""},phone:"",stav_select:"",stav_opt:["vyzváňal","nedostupný","číslo neexistuje","nemá záujem","nemá záujem - starobný dôchodca","kontaktovať inokedy","dohodnuté stretnutie","nekontaktovať","nekontaktovať - osobný blacklist","potenciálny pohovor","klient"],table_items_h:[],table_items:[],datum_akcie:"",poznamka:"",data_h_select:[]}},methods:{reloadData(){l.a.post("/api/call-page/get-history",{dataUser:this.$store.state.app.appData.dataUser}).then((t=>{console.log(t)}))},newContact(){if(void 0!=this.new_contact.name_full)return;if(this.mesto_select.length<4)return void this.showAlert('Je potrebne vybrať "Mesto"');let t=this.$store.state.app.appData.dataUser;l.a.post("https://app-44.herokuapp.com/api/call-page/new-contact",{dataUser:t,okres:this.mesto_select}).then((t=>{"logout"==t.data?this.$store.commit("logout"):(this.new_contact=t.data.newContact,this.phone=this.formatPhone(t.data.newContact.phone),this.cp_contact_count=t.data.cp_contact_count,this.stav_select="",this.datum_akcie="0000-00-00",this.produkty=[],this.poznamka="",this.table_items_h=t.data.newContact_h)}))},sendCotnact(){if(void 0==this.new_contact.name_full)return;if(""==this.stav_select)return this.showAlert('Je potrebné vybrať "Stav".'),!1;if(("kontaktovať inokedy"==this.stav_select||"dohodnuté stretnutie"==this.stav_select)&&"0000-00-00"==this.datum_akcie)return this.showAlert("Je potrebné vybrať dátum kontaktu/stretutia."),!1;let t=this.$store.state.app.appData.dataUser;l.a.post("https://app-44.herokuapp.com/api/call-page/update-new",{dataUser:t,dataContact:{id_string:this.new_contact.id_string,id_user:this.$store.state.app.appData.userName,stav:this.stav_select,date_akcia:this.dateToYMD(this.datum_akcie),date_upg:this.dateToYMD_hhmmss(new Date),produkt:this.produkty,poznamka:this.poznamka}}).then((t=>{1==t.data?(this.new_contact={},this.stav_select="",this.datum_akcie="0000-00-00",this.produkty=[],this.table_items_h=[],this.poznamka="",this.phone=""):this.showAlert("Error...")}))},selectItem(t){this.selected_item=t,this.stav_select="",this.datum_akcie="0000-00-00",this.produkty="",this.poznamka="",this.phone=this.formatPhone(t.phone),this.showHistory(t.phone),this.dialogShow=!0},saveChange(){},dateToDMY(t){if(""==t||" "==t)return"";var e=new Date(t),a=e.getDate(),i=e.getMonth()+1,o=e.getFullYear();let s=(a<=9?"0"+a:a)+"."+(i<=9?"0"+i:i)+"."+o;return"NaN.NaN.NaN"==s&&(s=""),s},showAlert(t){return this.$q.dialog({title:"Call-Page",message:t,ok:{color:"primary"},cancel:{color:"negative"}}),!1},dateToDMY_hhmm(t){let e=new Date(t),a=e.getMinutes(),i=e.getHours(),o=e.getDate(),s=e.getMonth()+1,l=e.getFullYear(),n=(o<=9?"0"+o:o)+"."+(s<=9?"0"+s:s)+"."+l;return n+=" "+(i<=9?"0"+i:i)+":"+(a<=9?"0"+a:a),n},dateToYMD_hhmmss(t){let e=new Date(t),a=e.getSeconds(),i=e.getMinutes(),o=e.getHours(),s=e.getDate(),l=e.getMonth()+1,n=e.getFullYear(),r=n+"-"+(l<=9?"0"+l:l)+"-"+(s<=9?"0"+s:s);return r+=" "+(o<=9?"0"+o:o)+":"+(i<=9?"0"+i:i)+":"+(a<=9?"0"+a:a),r},dateToYMD(t){let e=new Date(t),a=e.getDate(),i=e.getMonth()+1,o=e.getFullYear(),s=o+"-"+(i<=9?"0"+i:i)+"-"+(a<=9?"0"+a:a);return"NaN-NaN-NaN"==s&&(s="0000-00-00"),s},formatPhone(t){let e=t[0];return e+=t[1],e+=t[2],e+=t[3],e+="-",e+=t[4],e+=t[5],e+=t[6],e+="-",e+=t[7],e+=t[8],e+=t[9],e}},mounted(){let t=this.$store.state.app.appData.dataUser.cp_mesta;t=t.replace(/'/gi,"");let e=t.split(",");this.options_m=e,this.$nextTick((()=>{this.$refs.mesto.focus()}))},components:{"select-products":a("9a3c").default}}),r=n,c=(a("6151"),a("2877")),u=a("9989"),p=a("9c40"),d=a("0016"),v=a("ddd8"),m=a("27f9"),_=a("66e5"),h=a("4074"),k=a("0170"),b=a("9564"),P=a("24e8"),y=a("eebe"),g=a.n(y),f=Object(c["a"])(r,i,o,!1,null,null,null);e["default"]=f.exports;g()(f,"components",{QPage:u["a"],QBtn:p["a"],QIcon:d["a"],QSelect:v["a"],QInput:m["a"],QItem:_["a"],QItemSection:h["a"],QItemLabel:k["a"],QToggle:b["a"],QDialog:P["a"]})},"4b30":function(t,e,a){},6151:function(t,e,a){"use strict";a("4b30")},"9a3c":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("div",{staticClass:"q-mt-xs"},[a("q-select",{staticStyle:{width:"100%"},attrs:{filled:"",options:t.options,label:"Produkty",multiple:"","emit-value":"","map-options":"",value:t.produkty},on:{input:function(e){return t.$emit("updateProducts",t.model)}},scopedSlots:t._u([{key:"option",fn:function(e){var i=e.itemProps,o=e.itemEvents,s=e.opt,l=e.selected,n=e.toggleOption;return[a("q-item",t._g(t._b({},"q-item",i,!1),o),[a("q-item-section",[a("q-item-label",{domProps:{innerHTML:t._s(s.label)}})],1),a("q-item-section",{attrs:{side:""}},[a("q-toggle",{attrs:{value:l},on:{input:function(t){return n(s)}}})],1)],1)]}}]),model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1)])},o=[],s={props:["produkty"],data(){return{model:[],options:[{label:"Dôchodok - 2. pilier",value:"Dôchodok - 2. pilier"},{label:"Dôchodok - 3. pilier",value:"Dôchodok - 3. pilier"},{label:"Investícia - Podielové fondy",value:"Investícia - Podielové fondy"},{label:"Investícia - Sporiaci účet",value:"Investícia - Sporiaci účet"},{label:"Poistenie - Bytu",value:"Poistenie - Bytu"},{label:"Poistenie - Domácnosti",value:"Poistenie - Domácnosti"},{label:"Poistenie - Domu",value:"Poistenie - Domu"},{label:"Poistenie - Havarijné (HP)",value:"Poistenie - Havarijné (HP)"},{label:"Poistenie - Investičné životné (IŽP)",value:"Poistenie - Investičné životné (IŽP)"},{label:"Poistenie - Kapitalové (KŽP)",value:"Poistenie - Kapitalové (KŽP)"},{label:"Poistenie - Majetku",value:"Poistenie - Majetku"},{label:"Poistenie - Rizikové",value:"Poistenie - Rizikové"},{label:"Poistenie - Úrazové",value:"Poistenie - Úrazové"},{label:"Poistenie - Zákonné (PZP)",value:"Poistenie - Zákonné (PZP)"},{label:"Poistenie - Životné (ŽP)",value:"Poistenie - Životné (ŽP)"},{label:"Úver - Hypotekárny",value:"Úver - Hypotekárny"},{label:"Úver - Leasing",value:"Úver - Leasing"},{label:"Úver - Nebankové pôžičky",value:"Úver - Nebankové pôžičky"},{label:"Úver - Spotrebný",value:"Úver - Spotrebný"}]}},methods:{}},l=s,n=a("2877"),r=a("ddd8"),c=a("66e5"),u=a("4074"),p=a("0170"),d=a("9564"),v=a("eebe"),m=a.n(v),_=Object(n["a"])(l,i,o,!1,null,null,null);e["default"]=_.exports;m()(_,"components",{QSelect:r["a"],QItem:c["a"],QItemSection:u["a"],QItemLabel:p["a"],QToggle:d["a"]})}}]);