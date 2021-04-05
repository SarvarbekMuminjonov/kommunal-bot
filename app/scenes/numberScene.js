const { Scenes, Markup } = require("telegraf");
const {User,Account} = require('../database/controllers/main')
const getUserData = require("../services/exemple");
const personalNumberKeyboard = require("../core/keyboards/numberKeyboard");

let lang = "";
let uz = "<b>Hisob raqamingizni kiriting</b>";
let ru = "Введите номер вашего счета";
let error = "";
let errorUz = `Xato! Nimadur xato kiritildi 
boshidan boshlash uchun /start ni bosing.`;
let errorRu = `Oшибкa ! Что-то пошло не так
Нажмите /start , чтобы начать заново.
`;

let editing = "";
const numberScene = new Scenes.BaseScene("number")
	.enter((ctx) => {
		// ctx.deleteMessage()
		editing = "";
		if (ctx.session.lang == "ru") {
			lang = ru;
			error = errorRu;
		} else {
			lang = uz;
			error = errorUz;
		}
		return ctx.editMessageText(lang, {
			parse_mode: "HTML",
			...Markup.inlineKeyboard(personalNumberKeyboard(ctx.session.lang)),
		});
	})
	.hears(/\d+/, (ctx) => {
		console.log('hears')
		ctx.session.personalNumber = ctx.match[0];
		return fetch(ctx);
	})
	.action(/.+/, (ctx) => {
		if (ctx.match[0] == "start") {
			return ctx.scene.enter("lang");
		}
		if (ctx.match[0] == "delete") editing = editing.slice(0, -1);

		if (ctx.match[0] == "orqaga") {
			return ctx.scene.enter("district");
		}

		if (ctx.match[0] == "natija") {
			ctx.session.personalNumber = editing;
			ctx.deleteMessage();
			return fetch(ctx);
		}

		if (ctx.match[0] !== "delete" && ctx.match[0] != "natija") {
			editing += ctx.match[0];
			ctx.answerCbQuery("ok");
		}

		return ctx.editMessageReplyMarkup({
			inline_keyboard: [
				[Markup.button.callback(`${editing}`, "edit")],
				...personalNumberKeyboard(ctx.session.lang),
			],
		});
	})
	.use((ctx) => {})
	.leave((ctx)=>{})

async function fetch(ctx) {
	return getUserData({
		lang: ctx.session.lang,
		id: ctx.session.serviceId,
		personal_account: ctx.session.personalNumber,
		service_id: ctx.session.serviceId,
		region_id: ctx.session.regionNumber,
		sub_region_id: ctx.session.districtNumber,
	})
		.then((res) => {
			 
			const data = res.map((val) => `${val.name}: ${val.value}`).join("\n")
			if(!Account.getOne(ctx.session.personalNumber)){
				Account.create(
					ctx.session.personalNumber,
					data,
					ctx.session.serviceId,
					ctx.session.regionNumber,
					ctx.session.districtNumber,
					ctx.session.user_id
				)
			}
			
			ctx.reply(data)
			return ctx.scene.leave('number') 
		})
		.catch((err) => {
			console.log(err);
			// ctx.session.leave('number')
			ctx.reply(error)
			return ctx.scene.leave('number')
		})
}

module.exports = numberScene;
