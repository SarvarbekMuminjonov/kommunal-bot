const { Markup, Scenes } = require("telegraf");
const {buttonGenerator , getArray} = require("../utils/keyboards/buttuonGenerator");

// const regionsButton = Markup.inlineKeyboard([
// 	[
// 		Markup.button.callback("Andijon", "n0300"),
// 		Markup.button.callback("Buxoro", "n0601"),
// 	],
// 	[
// 		Markup.button.callback("Jizzax", "n0802"),
// 		Markup.button.callback("Qashqadaryo", "n1003"),
// 	],
// 	[
// 		Markup.button.callback("Navoiy", "n1204"),
// 		Markup.button.callback("Namangan", "n1405"),
// 	],
// 	[
// 		Markup.button.callback("Samarqand", "n1806"),
// 		Markup.button.callback("Surxandaryo", "n2207"),
// 	],
// 	[
// 		Markup.button.callback("Sirdaryo", "n2408"),
// 		Markup.button.callback("Toshkent shahri", "n2609"),
// 	],
// 	[
// 		Markup.button.callback("Toshkent v", "n2710"),
// 		Markup.button.callback("Farg`ona", "n3011"),
// 	],
// 	[
// 		Markup.button.callback("Xorazm", "n3312"),
// 		Markup.button.callback("Qoraqalpog`iston Respublikasi", "n3513"),
// 	],
// ]);

const regionScene = new Scenes.BaseScene("region");
regionScene.enter((ctx) => {
	const array = getArray(ctx.session.serviceId)
	ctx.deleteMessage()
	ctx.reply("Viloyatni tanlang", {
		...buttonGenerator(
			array
		), 
	});
});

regionScene.action(/.+/, (ctx) => {
	ctx.session.regionNumber = ctx.match[0].split('-')[0];
	ctx.session.regIndex = ctx.match[0].split('-')[1]
	if(ctx.match[0] == 'orqaga'){
		ctx.deleteMessage()
		return ctx.scene.enter('services')
	}
	
	//ctx.session.regIndex = Number.parseInt(ctx.match.input.slice(3));
	//console.log(ctx.session.regIndex)
	//console.log(ctx.session.regionNumber)
	ctx.answerCbQuery("ok");
	return ctx.scene.enter("district");
});

module.exports = regionScene;
