const { Scenes } = require("telegraf")
const {buttonGenerator , getArray} = require("../utils/keyboards/buttuonGenerator")
let lang=''
let ru = "Bыберите свой район или город"
let uz = "Tuman yoki shahringizni tanlang"


const districtScene = new Scenes.BaseScene("district")

.enter((ctx) => {
	const array = getArray(ctx.session.serviceId)
	// ctx.deleteMessage()
	if(ctx.session.lang == 'ru')lang=ru
	else lang=uz
	ctx.editMessageText(lang, {
		...buttonGenerator(
			array[ctx.session.regIndex].Children.Area,
			ctx.session.lang
		),
	})
})

.action(/.+/, (ctx) => {
	if (ctx.match[0] == "orqaga") {
		ctx.scene.enter("region")
		ctx.answerCbQuery("ok")
	} else {
		ctx.session.districtNumber = ctx.match[0].split('-')[0]
		ctx.answerCbQuery("ok")
		return ctx.scene.enter("number")
	}
})

module.exports = districtScene;
