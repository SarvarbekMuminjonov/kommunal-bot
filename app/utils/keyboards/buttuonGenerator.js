const { Markup, Context } = require("telegraf");
//const json = require("../../constants/regionsElektr.json");
//let arr = json;

 function buttonGenerator(array,lang) {
	let btnarr = [];
	

	let btn = [];
	for (let i = 0; i < array.length; i++) {
		btnarr.push(
			Markup.button.callback(
				array[i].AreaName[lang],
				array[i].Code+"-"+i
			)
		);
		if ((i + 1) % 2 == 0) {
			btn.push(btnarr);
			btnarr = [];
		}
		if (array.length % 2 == 1 && i == array.length - 1) btn.push(btnarr);
	}
	if(lang =='ru')btn.push([Markup.button.callback('Назад','orqaga')])
	else btn.push([Markup.button.callback("Ortga qaytish", "orqaga")]);
	return Markup.inlineKeyboard(btn);
};

function getArray(serviceId){
	let array=[]
	switch(serviceId){
		case '3': array=require('../../constants/regionsElektr.json')
		break
		case '166':array = require('../../constants/gazData.json')
		break
		case '127':array = require('../../constants/issiqSuv.json')
		break
		case '119':array = require('../../constants/sovuqSuv.json')

	}
	return array
}

module.exports= {
	buttonGenerator,
	getArray
}