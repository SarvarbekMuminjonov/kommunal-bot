const { Markup, Scenes } = require("telegraf")
const {
	buttonGenerator,
	getArray,
} = require("../utils/keyboards/buttuonGenerator")


const regionScene = new Scenes.BaseScene("region")

regionScene.enter((ctx) => {
	const array = getArray(ctx.session.serviceId)
	console.log('reg',ctx.i18n.locale())
	ctx.editMessageText(ctx.i18n.t('region'), {
		...buttonGenerator(array, ctx.session.lang,ctx.i18n.t('exit')),
	})
})

regionScene.action(/.+/, (ctx) => {
	ctx.session.regionNumber = ctx.match[0].split("-")[0]
	ctx.session.regIndex = ctx.match[0].split("-")[1]
	if (ctx.match[0] == "orqaga") {
		return ctx.scene.enter("services")
	}
	ctx.answerCbQuery("ok")
	return ctx.scene.enter("district")
})

module.exports = regionScene
