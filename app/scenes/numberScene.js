const { Scenes, Markup } = require("telegraf")

const getUserData = require("../services/exemple")
const personalNumberKeyboard = require('../core/keyboards/numberKeyboard')
let uz = "<b>Hisob raqamingizni kiriting</b>"
let ru = "Введите номер вашего счета"
let errorUz=`Xato! Nimadur xato kiritildi 
boshidan boshlash uchun /start ni bosing.`
let errorRu= `Oшибкa ! Что-то пошло не так
Нажмите /start , чтобы начать заново.
` 


let editing = ""
const numberScene = new Scenes.BaseScene("number")
.enter((ctx) => {
	// ctx.deleteMessage()
	editing=''
	if(ctx.session.lang == 'ru'){
		uz=ru
		errorUz= errorRu
	}	
	return ctx.editMessageText(uz, {
		parse_mode: "HTML",
		...Markup.inlineKeyboard(personalNumberKeyboard(ctx.session.lang)),
	})
})

.action(/.+/, (ctx) => {
	if(ctx.match[0]=='start'){
		return ctx.scene.enter('lang')
	}
	if (ctx.match[0] == "delete") editing = editing.slice(0, -1)

	if (ctx.match[0] == "orqaga") {
		ctx.scene.enter("district")
		return ctx.answerCbQuery("ok")
	}

	if (ctx.match[0] == "natija") {
		ctx.session.personalNumber = editing
		const creditials = {
			lang:ctx.session.lang,
			id:ctx.session.serviceId,
			personal_account: (ctx.session.personalNumber),
			service_id: 3,
			region_id: Number.parseInt(ctx.session.regionNumber),
			sub_region_id: Number.parseInt(ctx.session.districtNumber),
		}
		let resultMsg = ``
		
		getUserData(creditials)
		.then((res) => {
			
			res.forEach((val) => {
				resultMsg += `${val.name} : ${val.value}\n`
			})
			
			ctx.editMessageText(resultMsg)
		
		})

		.catch(err=>{
		
			return ctx.editMessageText(errorUz,
				Markup.inlineKeyboard([
					Markup.button.callback('start','start')
				]))
		
		})
		return ctx.answerCbQuery('ok')
	}

	if (ctx.match[0] !== "delete" && ctx.match[0] != "natija") {
		editing += ctx.match[0]
		ctx.answerCbQuery("ok")
	}
	

	ctx.editMessageReplyMarkup({
		inline_keyboard: [
			[Markup.button.callback(`${editing}`, "edit")],
			...personalNumberKeyboard(ctx.session.lang),
		],
	})
})



module.exports = numberScene
