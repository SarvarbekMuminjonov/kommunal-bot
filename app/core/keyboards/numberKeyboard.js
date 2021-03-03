const {Markup} = require('telegraf')

let backUz='Orqaga'
let backRu = 'Назад'
let resultUz ='Natija'
let resulRu ='Результат'
let deleteUz = 'O\'chirish'
let deleteRu = 'Удалить'


function personalNumberKeyboard(lang){
if(lang == 'ru'){
    backUz=backRu
    resultUz=resulRu
    deleteUz=deleteRu
}
return [
	[
		Markup.button.callback("1", "1"),
		Markup.button.callback("2", "2"),
		Markup.button.callback("3", "3"),
	],
	[
		Markup.button.callback("4", "4"),
		Markup.button.callback("5", "5"),
		Markup.button.callback("6", "6"),
	],
	[
		Markup.button.callback("7", "7"),
		Markup.button.callback("8", "8"),
		Markup.button.callback("9", "9"),
	],
	[
		Markup.button.callback(backUz, "orqaga"),
		Markup.button.callback("0", "0"),
		Markup.button.callback(deleteUz, "delete"),
	],
	[Markup.button.callback(resultUz, "natija")],
]
}

module.exports = personalNumberKeyboard