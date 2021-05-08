const { Markup } = require('telegraf')


function getAccountsKeyboard(accounts,str) {

	let btnarr = [];
	let btn = [];
	for (let i = 0; i < accounts.length; i++) {
		btnarr.push(
			Markup.button.callback(
				accounts[i].data.split(/\n/)[0].slice(7) + ` : ${accounts[i].id}`,
				accounts[i].id
			)
		);
		if ((i + 1) % 2 == 0) {
			btn.push(btnarr)
			btn.push(Markup.button.callback(str, 'new'))
			btnarr = [];
		}
		if (accounts.length % 2 == 1 && i == accounts.length - 1) {
			btnarr.push(Markup.button.callback(str, 'new'))
			btn.push(btnarr)
		}
	}
	//btn.push(Markup.button.callback('Akkount qo\'shish','new'))
	//Sat May 08 2021 15:53:06 
	// if(lang =='ru')btn.push([Markup.button.callback('Назад','orqaga')])
	// else btn.push([Markup.button.callback("Ortga qaytish", "orqaga")]);
	return {
		'data':JSON.parse(JSON.stringify(accounts[0].updatedAt.toString().slice(0,24)+'\n'+accounts[0].data)),
		'keyboard':Markup.inlineKeyboard(btn)
	}
}

module.exports = getAccountsKeyboard

