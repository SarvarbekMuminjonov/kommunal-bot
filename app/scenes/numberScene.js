const { Scenes, Markup } = require("telegraf");
const numberScene = new Scenes.BaseScene("number");
const getUserData = require("../services/exemple");
const personalNumberKeyboard = require('../core/keyboards/numberKeyboard')
let uz = "<b>Hisob raqamingizni kiriting</b>"
let ru = "Введите номер вашего счета"


// numberScene.use(session())
let editing = "";
numberScene.enter((ctx) => {
	ctx.deleteMessage();
	editing=''
	if(ctx.session.lang == 'ru')uz=ru
	return ctx.reply(uz, {
		parse_mode: "HTML",
		...Markup.inlineKeyboard(personalNumberKeyboard(ctx.session.lang)),
	});
});

numberScene.action(/.+/, (ctx) => {
	if (ctx.match[0] == "delete") editing = editing.slice(0, -1);

	if (ctx.match[0] == "orqaga") {
		ctx.scene.enter("district");
		return ctx.answerCbQuery("ok");
	}

	if (ctx.match[0] == "natija") {
		ctx.session.personalNumber = editing;
		const creditials = {
			lang:ctx.session.lang,
			id:ctx.session.serviceId,
			personal_account: (ctx.session.personalNumber),
			service_id: 3,
			region_id: Number.parseInt(ctx.session.regionNumber),
			sub_region_id: Number.parseInt(ctx.session.districtNumber),
		};
		let resultMsg = ``;
		console.log(creditials)
		
		getUserData(creditials)
		.then((res) => {
			
			res.forEach((val) => {
				resultMsg += `${val.name} : ${val.value}\n`
			})
			ctx.deleteMessage();
			ctx.reply(resultMsg);}
		);
		return ctx.answerCbQuery("So'rov qabul qilindi");
	}

	if (ctx.match[0] !== "delete" && ctx.match[0] != "natija") {
		editing += ctx.match[0];
		ctx.answerCbQuery("ok");
	}

	ctx.editMessageReplyMarkup({
		inline_keyboard: [
			[Markup.button.callback(`${editing}`, "edit")],
			...personalNumberKeyboard(ctx.session.lang),
		],
	});
});

module.exports = numberScene;
