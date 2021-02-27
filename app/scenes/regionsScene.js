const { Markup, Scenes } = require("telegraf");

const regionsButton = Markup.inlineKeyboard([
	[
		Markup.button.callback("Andijon", "n0300"),
		Markup.button.callback("Buxoro", "n0601"),
	],
	[
		Markup.button.callback("Jizzax", "n0802"),
		Markup.button.callback("Qashqadaryo", "n1003"),
	],
	[
		Markup.button.callback("Navoiy", "n1204"),
		Markup.button.callback("Namangan", "n1405"),
	],
	[
		Markup.button.callback("Samarqand", "n1806"),
		Markup.button.callback("Surxandaryo", "n2207"),
	],
	[
		Markup.button.callback("Sirdaryo", "n2408"),
		Markup.button.callback("Toshkent shahri", "n2609"),
	],
	[
		Markup.button.callback("Toshkent v", "n2710"),
		Markup.button.callback("Farg`ona", "n3011"),
	],
	[
		Markup.button.callback("Xorazm", "n3312"),
		Markup.button.callback("Qoraqalpog`iston Respublikasi", "n3513"),
	],
]);

const regionScene = new Scenes.BaseScene("region");
regionScene.enter((ctx) => {
	// ctx.deleteMessage()
	ctx.reply("Viloyatni tanlang", {
		...regionsButton,
	});
});

regionScene.action(/^n/, (ctx) => {
	ctx.session.regionNumber = ctx.match.input.slice(1, 3);
	ctx.session.regIndex = Number.parseInt(ctx.match.input.slice(3));
	//console.log(ctx.session.regIndex)
	//console.log(ctx.session.regionNumber)
	ctx.answerCbQuery("ok");
	return ctx.scene.enter("district");
});

module.exports = regionScene;
