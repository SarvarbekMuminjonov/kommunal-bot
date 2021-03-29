const { Markup, Scenes } = require("telegraf");
const {
	buttonGenerator,
	getArray,
} = require("../utils/keyboards/buttuonGenerator");
let uz = "Viloyatingizni tanlang";
let ru = "Выберите свой регион";
let lang = "";

const regionScene = new Scenes.BaseScene("region");

regionScene.enter((ctx) => {
	const array = getArray(ctx.session.serviceId);
	// ctx.deleteMessage()
	if (ctx.session.lang == "ru") lang = ru;
	else lang = uz;
	ctx.editMessageText(lang, {
		...buttonGenerator(array, ctx.session.lang),
	});
});

regionScene.action(/.+/, (ctx) => {
	ctx.session.regionNumber = ctx.match[0].split("-")[0];
	ctx.session.regIndex = ctx.match[0].split("-")[1];
	if (ctx.match[0] == "orqaga") {
		//ctx.deleteMessage()
		return ctx.scene.enter("services");
	}

	//ctx.session.regIndex = Number.parseInt(ctx.match.input.slice(3))
	//console.log(ctx.session.regIndex)
	//console.log(ctx.session.regionNumber)
	ctx.answerCbQuery("ok");
	return ctx.scene.enter("district");
});

module.exports = regionScene;
