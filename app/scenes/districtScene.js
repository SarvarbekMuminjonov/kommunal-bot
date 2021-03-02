const { Scenes } = require("telegraf");
const {buttonGenerator , getArray} = require("../utils/keyboards/buttuonGenerator");

const districtScene = new Scenes.BaseScene("district");

districtScene.enter((ctx) => {
	const array = getArray(ctx.session.serviceId)
	ctx.deleteMessage();
	ctx.reply("Tuman yoki shahringizni tanlang", {
		...buttonGenerator(
			array[ctx.session.regIndex].Children.Area
		),
	});
});

districtScene.action(/.+/, (ctx) => {
	if (ctx.match[0] == "orqaga") {
		ctx.scene.enter("region");
		ctx.answerCbQuery("ok");
	} else {
		ctx.session.districtNumber = ctx.match[0].split('-')[0];
		console.log(ctx.session.districtNumber);
		ctx.answerCbQuery("ok");
		return ctx.scene.enter("number");
	}
});

module.exports = districtScene;
