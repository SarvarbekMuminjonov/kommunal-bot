const {Markup} = require('telegraf')

let backUz='Orqaga',back=''
let backRu = 'Назад'
let resultUz ='Natija',result=''
let resulRu ='Результат'
let deleteUz = 'O\'chirish',remove=''
let deleteRu = 'Удалить'


function personalNumberKeyboard(lang){
if(lang == 'ru'){
    back=backRu
    result=resulRu
    remove=deleteRu
}
else {
	back=backUz
	result=resultUz
	remove=deleteUz
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
		Markup.button.callback(back, "orqaga"),
		Markup.button.callback("0", "0"),
		Markup.button.callback(remove, "delete"),
	],
	[Markup.button.callback(result, "natija")],
]
}

module.exports = personalNumberKeyboard