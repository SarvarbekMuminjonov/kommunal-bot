const { Markup, Scenes } = require("telegraf")
const {
	buttonGenerator,
	getArray,
} = require("../utils/keyboards/buttuonGenerator")


const regionScene = new Scenes.BaseScene("region")

regionScene
	.enter((ctx) => {
		if (ctx.session.user.lang)
			ctx.i18n.locale(ctx.session.user.lang)
		const array = getArray(ctx.session.serviceId)
		
		ctx.editMessageText(ctx.i18n.t('region'), {
			...buttonGenerator(array, ctx.session.user.lang, ctx.i18n.t('exit')),
		})
	})

	.action(/.+/, (ctx) => {
		ctx.session.regionNumber = ctx.match[0].split("-")[0]
		ctx.session.regIndex = ctx.match[0].split("-")[1]
		if (ctx.match[0] == "orqaga") {
			return ctx.scene.enter("services")
		}
		ctx.answerCbQuery("ok")
		return ctx.scene.enter("district")
	})
	.on('message', (ctx) => {
		ctx.deleteMessage()
		return ctx.scene.enter('region')
	})
module.exports = regionScene
