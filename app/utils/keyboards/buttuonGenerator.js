const { Markup } = require("telegraf");
//const json = require("../../constants/regionsElektr.json");
//let arr = json;

 function buttonGenerator(array) {
	let btnarr = [];
	

	let btn = [];
	for (let i = 0; i < array.length; i++) {
		btnarr.push(
			Markup.button.callback(
				array[i].Name,
				array[i].Code+"-"+i
			)
		);
		if ((i + 1) % 2 == 0) {
			btn.push(btnarr);
			btnarr = [];
		}
		if (array.length % 2 == 1 && i == array.length - 1) btn.push(btnarr);
	}
	btn.push([Markup.button.callback("Ortga qaytish", "orqaga")]);
	return Markup.inlineKeyboard(btn);
};

function getArray(serviceId){
	let array=[]
	switch(serviceId){
		case '0': array=require('../../constants/regionsElektr.json')
		break
		case '1':array = require('../../constants/gazData.json')
	}
	return array
}

module.exports= {
	buttonGenerator,
	getArray
}