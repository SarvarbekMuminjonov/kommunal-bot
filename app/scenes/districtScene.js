const { Scenes } = require("telegraf");
const {buttonGenerator , getArray} = require("../utils/keyboards/buttuonGenerator");

let ru = "Bыберите свой район или город"
let uz = "Tuman yoki shahringizni tanlang"


const districtScene = new Scenes.BaseScene("district");

districtScene.enter((ctx) => {
	const array = getArray(ctx.session.serviceId)
	ctx.deleteMessage();
	if(ctx.session.lang == 'ru')uz=ru
	ctx.reply(uz, {
		...buttonGenerator(
			array[ctx.session.regIndex].Children.Area,
			ctx.session.lang
		),
	});
});

districtScene.action(/.+/, (ctx) => {
	if (ctx.match[0] == "orqaga") {
		ctx.scene.enter("region");
		ctx.answerCbQuery("ok");
	} else {
		ctx.session.districtNumber = ctx.match[0].split('-')[0];
		ctx.answerCbQuery("ok");
		return ctx.scene.enter("number");
	}
});

module.exports = districtScene;
