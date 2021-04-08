const { Scenes } = require("telegraf");
const {
	buttonGenerator,
	getArray,
} = require("../utils/keyboards/buttuonGenerator");


const districtScene = new Scenes.BaseScene("district")

	.enter((ctx) => {
		const array = getArray(ctx.session.serviceId);
		console.log(ctx.i18n.locale())
		ctx.editMessageText(ctx.i18n.t('subregion'), {
			...buttonGenerator(
				array[ctx.session.regIndex].Children.Area,
				ctx.session.lang,
				ctx.i18n.t('exit')
			),
		});
	})

	.action(/.+/, (ctx) => {
		if (ctx.match[0] == "orqaga") {
			ctx.scene.enter("region");
			ctx.answerCbQuery("ok");
		} else {
			ctx.session.districtNumber = ctx.match[0].split("-")[0];
			ctx.answerCbQuery("ok");
			return ctx.scene.enter("number");
		}
	});

module.exports = districtScene;
