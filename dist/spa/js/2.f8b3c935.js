(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{2329:function(t,e,a){"use strict";a("48406")},48406:function(t,e,a){},"9a3c":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("div",{staticClass:"q-mt-xs"},[a("q-select",{staticStyle:{width:"100%"},attrs:{outlined:"","use-chips":"",options:t.options,label:"Produkty",multiple:"","emit-value":"","map-options":"",value:t.produkty},on:{input:function(e){return t.$emit("updateProducts",t.model)}},scopedSlots:t._u([{key:"option",fn:function(e){var s=e.itemProps,i=e.itemEvents,o=e.opt,n=e.selected,l=e.toggleOption;return[a("q-item",t._g(t._b({},"q-item",s,!1),i),[a("q-item-section",[a("q-item-label",{domProps:{innerHTML:t._s(o.label)}})],1),a("q-item-section",{attrs:{side:""}},[a("q-toggle",{attrs:{value:n},on:{input:function(t){return l(o)}}})],1)],1)]}}]),model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1)])},i=[],o={props:["produkty"],data(){return{model:[],options:[{label:"Dôchodok - 2. pilier",value:"Dôchodok - 2. pilier"},{label:"Dôchodok - 3. pilier",value:"Dôchodok - 3. pilier"},{label:"Investícia - Podielové fondy",value:"Investícia - Podielové fondy"},{label:"Investícia - Sporiaci účet",value:"Investícia - Sporiaci účet"},{label:"Poistenie - Bytu",value:"Poistenie - Bytu"},{label:"Poistenie - Domácnosti",value:"Poistenie - Domácnosti"},{label:"Poistenie - Domu",value:"Poistenie - Domu"},{label:"Poistenie - Havarijné (HP)",value:"Poistenie - Havarijné (HP)"},{label:"Poistenie - Investičné životné (IŽP)",value:"Poistenie - Investičné životné (IŽP)"},{label:"Poistenie - Kapitalové (KŽP)",value:"Poistenie - Kapitalové (KŽP)"},{label:"Poistenie - Majetku",value:"Poistenie - Majetku"},{label:"Poistenie - Rizikové",value:"Poistenie - Rizikové"},{label:"Poistenie - Úrazové",value:"Poistenie - Úrazové"},{label:"Poistenie - Zákonné (PZP)",value:"Poistenie - Zákonné (PZP)"},{label:"Poistenie - Životné (ŽP)",value:"Poistenie - Životné (ŽP)"},{label:"Úver - Hypotekárny",value:"Úver - Hypotekárny"},{label:"Úver - Leasing",value:"Úver - Leasing"},{label:"Úver - Nebankové pôžičky",value:"Úver - Nebankové pôžičky"},{label:"Úver - Spotrebný",value:"Úver - Spotrebný"}]}},methods:{}},n=o,l=a("2877"),r=a("ddd8"),c=a("66e5"),d=a("4074"),u=a("0170"),p=a("9564"),h=a("eebe"),m=a.n(h),v=Object(l["a"])(n,s,i,!1,null,null,null);e["default"]=v.exports;m()(v,"components",{QSelect:r["a"],QItem:c["a"],QItemSection:d["a"],QItemLabel:u["a"],QToggle:p["a"]})},c5d3:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-pa-sm"},[a("div",{staticClass:"row"},[a("q-btn",{staticClass:"q-mr-sm",staticStyle:{width:"54px",height:"54px"},attrs:{label:"",type:"submit",color:"primary"},on:{click:t.reloadData}},[a("q-icon",{attrs:{name:"cached"}})],1),t._e(),a("div",{staticClass:"q-gutter-md row items-start q-mr-sm"},[a("q-input",{staticStyle:{width:"200px"},attrs:{outlined:"",label:"Produkt/Stav",dense:t.dense},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.reloadData(e)}},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.searchString,callback:function(e){t.searchString=e},expression:"searchString"}})],1),a("div",{staticClass:"q-gutter-sm row items-start q-mb-sm"},[a("q-input",{staticStyle:{width:"200px"},attrs:{outlined:"",label:"Meno/Mobil",dense:t.dense},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.reloadData(e)}},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.searchString_2,callback:function(e){t.searchString_2=e},expression:"searchString_2"}})],1),a("div",{staticClass:"row q-mg-sm"},[a("div",{staticClass:"q-gutter-sm"},[a("q-checkbox",{attrs:{label:"Vyhľadať produkt v poznámke"},on:{input:function(e){return t.checkPoznamkaChange()}},model:{value:t.checkPoznamka,callback:function(e){t.checkPoznamka=e},expression:"checkPoznamka"}})],1)]),a("div",{staticClass:"q-gutter-md row items-start hide"},[a("q-input",{staticStyle:{width:"200px"},attrs:{outlined:"",label:"Mobil",dense:t.dense},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.reloadData(e)}},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.searchString_3,callback:function(e){t.searchString_3=e},expression:"searchString_3"}})],1),a("q-space"),a("div",{staticClass:"q-pl-sm"},[a("q-select",{ref:"mesto",staticStyle:{width:"250px"},attrs:{label:"Mesto","transition-show":"flip-up","transition-hide":"flip-down",outlined:"",options:t.options},on:{input:function(e){return t.selectMesto()}},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"place"}})]},proxy:!0}]),model:{value:t.mesto_select,callback:function(e){t.mesto_select=e},expression:"mesto_select"}})],1)],1),t.table_items.length>0?a("div",[a("table",{staticClass:"table"},[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("Dátum")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("Meno")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("Stav")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("Produkty")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("Poznamka")])]),t._l(t.table_items,(function(e,s){return a("tr",{key:s,on:{click:function(a){return t.selectItem(e)}}},[a("td",[t._v(t._s(t.dateToDMY(e.date_upg)))]),a("td",[t._v(t._s(e.name_full))]),a("td",[t._v(t._s(e.stav))]),a("td",[t._v(t._s(e.produkt))]),a("td",[t._v(t._s(e.poznamka))])])}))],2),a("div",{staticClass:"popText"},[t._v("Počet riadkov: "+t._s(t.table_items.length))])]):t._e(),a("q-dialog"),a("div",{staticClass:"q-pa-md q-gutter-sm"},[a("q-dialog",{attrs:{persistent:"",maximized:t.maximizedToggle},model:{value:t.dialogShow,callback:function(e){t.dialogShow=e},expression:"dialogShow"}},[a("q-card",{},[a("q-bar",{staticClass:"bg-primary text-white"},[a("q-btn",{attrs:{dense:"",flat:"",icon:"save",label:"Uložiť"},on:{click:function(e){return t.saveChange()}}},[a("q-tooltip",{attrs:{"content-class":"bg-white text-white bg-green"}},[t._v("Uložiť")])],1),a("q-space"),a("q-btn",{attrs:{dense:"",flat:"",icon:"minimize",disable:!t.maximizedToggle},on:{click:function(e){t.maximizedToggle=!1}}},[t.maximizedToggle?a("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Minimize")]):t._e()],1),a("q-btn",{attrs:{dense:"",flat:"",icon:"crop_square",disable:t.maximizedToggle},on:{click:function(e){t.maximizedToggle=!0}}},[t.maximizedToggle?t._e():a("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Maximize")])],1),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",icon:"close"}},[a("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Close")])],1)],1),a("q-card-section",{staticClass:"q-pt-none"},[a("div",{staticClass:"text-h4 q-mt-sm"},[t._v(t._s(t.selected_item.name_full))]),t.selected_item?a("div",{staticClass:"text-h5"},[t._v(t._s(t.phone))]):t._e(),a("div",{staticClass:"row q-mt-sm"},[a("q-select",{staticStyle:{width:"300px"},attrs:{label:"Stav",outlined:"",options:t.stav_opt},model:{value:t.stav_select,callback:function(e){t.stav_select=e},expression:"stav_select"}}),a("q-input",{staticClass:"q-ml-xs",staticStyle:{width:"160px"},attrs:{outlined:"",type:"date"},model:{value:t.datum_akcie,callback:function(e){t.datum_akcie=e},expression:"datum_akcie"}})],1),a("select-products",{attrs:{produkty:t.produkty},on:{updateProducts:function(e){t.produkty=e}}}),a("q-input",{staticClass:"q-mt-xs",staticStyle:{width:"100%"},attrs:{label:"Poznamky",outlined:"",type:"textarea"},model:{value:t.poznamka,callback:function(e){t.poznamka=e},expression:"poznamka"}}),t.data_h_select.length>0?a("div",t._l(t.data_h_select,(function(e,s){return a("div",{key:s},[a("div",{staticStyle:{width:"30%","min-width":"450px"}},[a("hr")]),a("div",[t._v(t._s(t.dateToDMY_hhmm(e.date_upg))+", "+t._s(e.id_user)+", "),a("b",[t._v(t._s(e.stav))])]),e.produkt?a("div",[a("b",[t._v("Produkty: ")]),t._v(t._s(e.produkt))]):t._e(),e.poznamka?a("div",[a("b",[t._v("Poznámky: ")]),t._v(t._s(e.poznamka))]):t._e()])})),0):t._e()],1)],1)],1)],1)],1)},i=[],o=(a("5319"),a("bc3a")),n=a.n(o),l=a("f508"),r=a("cf57"),c={data(){return{checkPoznamka:!1,stav_select:"",datum_akcie:"",produkty:"",poznamka:"",phone:"",maximizedToggle:!1,dialogShow:!1,stav_opt:["vyzváňal","nedostupný","číslo neexistuje","nemá záujem","nemá záujem - starobný dôchodca","kontaktovať inokedy","dohodnuté stretnutie","nekontaktovať","nekontaktovať - osobný blacklist","potenciálny pohovor","klient"],searchString:"",searchString_2:"",searchString_3:"",ph:"",dense:!1,model:null,mesto_select:[],options:[],table_items:[],data_h:[],data_h_select:[],selected_item:{},selected_item_h:""}},methods:{checkPoznamkaChange(){this.reloadData()},saveChange(){if(""==this.stav_select)return this.showAlert('Je potrebné vybrať "Stav".'),!1;if(("kontaktovať inokedy"==this.stav_select||"dohodnuté stretnutie"==this.stav_select)&&"0000-00-00"==this.datum_akcie)return this.showAlert("Je potrebné vybrať dátum kontaktu/stretutia."),!1;l["a"].show({spinner:r["a"]});let t=this.$store.state.app.appData.dataUser;n.a.post("https://app-44.herokuapp.com/api/call-page/update",{dataUser:t,dataContact:{id_string:this.selected_item.id_string,id_user:this.$store.state.app.appData.userName,stav:this.stav_select,date_akcia:this.dateToYMD(this.datum_akcie),date_upg:this.dateToYMD_hhmmss(new Date),produkt:this.produkty,poznamka:this.poznamka}}).then((t=>{1==t.data?(this.reloadData(),this.dialogShow=!1):this.showAlert("Error...")}))},reloadData(){if(0==this.mesto_select.length)return this.$q.dialog({title:"Call-Page",message:'Je potrebne vybrať "Mesto"',ok:{color:"primary"},cancel:{color:"negative"}}),!1;l["a"].show({spinner:r["a"]});let t=this.$store.state.app.appData.dataUser;n.a.post("https://app-44.herokuapp.com/api/call-page/custom-data",{dataUser:t,poznamka:this.checkPoznamka,dataContact:{mesta:this.mesto_select,searchString:this.searchString,searchString_2:this.searchString_2,searchString_3:this.searchString_3}}).then((t=>{if(l["a"].hide(),"logout"==t.data)this.$store.commit("logout");else{if("<>"==t.data)return void this.showAlert("Na pužitie tejto sekcie nie sú splnené podmienky.");this.data_h=[],this.table_items=[],this.table_items=t.data.data,this.data_h=t.data.data_h}}))},selectItem(t){this.selected_item=t,this.stav_select="",this.datum_akcie="0000-00-00",this.produkty="",this.poznamka="",this.phone=this.formatPhone(t.phone),this.showHistory(t.phone),this.dialogShow=!0},showHistory(t){this.data_h_select=[];for(let e=0;e<this.data_h.length;e++)t==this.data_h[e].phone&&this.data_h_select.push(this.data_h[e])},dateToDMY(t){if(""==t||" "==t)return"";var e=new Date(t),a=e.getDate(),s=e.getMonth()+1,i=e.getFullYear();let o=(a<=9?"0"+a:a)+"."+(s<=9?"0"+s:s)+"."+i;return"NaN.NaN.NaN"==o&&(o=""),o},showAlert(t){return this.$q.dialog({title:"Call-Page",message:t,ok:{color:"primary"},cancel:{color:"negative"}}),!1},dateToDMY_hhmm(t){let e=new Date(t),a=e.getMinutes(),s=e.getHours(),i=e.getDate(),o=e.getMonth()+1,n=e.getFullYear(),l=(i<=9?"0"+i:i)+"."+(o<=9?"0"+o:o)+"."+n;return l+=" "+(s<=9?"0"+s:s)+":"+(a<=9?"0"+a:a),l},dateToYMD_hhmmss(t){let e=new Date(t),a=e.getSeconds(),s=e.getMinutes(),i=e.getHours(),o=e.getDate(),n=e.getMonth()+1,l=e.getFullYear(),r=l+"-"+(n<=9?"0"+n:n)+"-"+(o<=9?"0"+o:o);return r+=" "+(i<=9?"0"+i:i)+":"+(s<=9?"0"+s:s)+":"+(a<=9?"0"+a:a),r},dateToYMD(t){let e=new Date(t),a=e.getDate(),s=e.getMonth()+1,i=e.getFullYear(),o=i+"-"+(s<=9?"0"+s:s)+"-"+(a<=9?"0"+a:a);return"NaN-NaN-NaN"==o&&(o="0000-00-00"),o},formatPhone(t){let e=t[0];return e+=t[1],e+=t[2],e+=t[3],e+="-",e+=t[4],e+=t[5],e+=t[6],e+="-",e+=t[7],e+=t[8],e+=t[9],e},selectMesto(){this.$store.commit("updateMestoSelect",this.mesto_select),this.reloadData()}},mounted(){let t=this.$store.state.app.appData.dataUser.cp_mesta;t=t.replace(/'/gi,"");let e=t.split(",");this.options=e;let a=this.$store.state.app.appData.mestoSelect;void 0!=a?this.mesto_select=a:this.$nextTick((()=>{this.$refs.mesto.focus()}))},components:{"select-products":a("9a3c").default}},d=c,u=(a("2329"),a("2877")),p=a("9989"),h=a("9c40"),m=a("0016"),v=a("27f9"),_=a("8f8e"),k=a("2c91"),g=a("ddd8"),b=a("24e8"),y=a("f09f"),f=a("d847"),P=a("05c0"),S=a("a370"),x=a("7f67"),q=a("eebe"),w=a.n(q),z=Object(u["a"])(d,s,i,!1,null,null,null);e["default"]=z.exports;w()(z,"components",{QPage:p["a"],QBtn:h["a"],QIcon:m["a"],QInput:v["a"],QCheckbox:_["a"],QSpace:k["a"],QSelect:g["a"],QDialog:b["a"],QCard:y["a"],QBar:f["a"],QTooltip:P["a"],QCardSection:S["a"]}),w()(z,"directives",{ClosePopup:x["a"]})}}]);