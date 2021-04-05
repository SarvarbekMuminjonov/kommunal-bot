const { Markup } = require('telegraf')
const { Account } = require('../../database/controllers/main')

function getAccountsKeyboard(accounts) {
  console.log('get',accounts)
  let btnarr = [];
	let btn = [];
	for (let i = 0; i < accounts.length; i++) {
		btnarr.push(
			Markup.button.callback(
				accounts[i].data.split(/\n/)[0],
				accounts[i].id
			)
		);
		if ((i + 1) % 2 == 0) {
			btn.push(btnarr);
			btnarr = [];
		}
		if (accounts.length % 2 == 1 && i == accounts.length - 1) btn.push(btnarr);
	}
	// if(lang =='ru')btn.push([Markup.button.callback('Назад','orqaga')])
	// else btn.push([Markup.button.callback("Ortga qaytish", "orqaga")]);
	return Markup.inlineKeyboard(btn);
}

module.exports = getAccountsKeyboard

