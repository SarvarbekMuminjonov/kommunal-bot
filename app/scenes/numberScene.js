const { Scenes, Markup } = require("telegraf");
const { User, Account } = require('../database/controllers/main')
const getUserData = require("../services/exemple");
const personalNumberKeyboard = require("../core/keyboards/numberKeyboard");
let editing

const numberScene = new Scenes.BaseScene("number")

	.enter((ctx) => {
		editing = ''
		return ctx.editMessageText(ctx.i18n.t('personalNumber'), {
			parse_mode: "HTML",
			...Markup.inlineKeyboard(personalNumberKeyboard(ctx)),
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
				...personalNumberKeyboard(ctx),
			],
		});
	})
	.on('message', (ctx) => {
		ctx.deleteMessage()
		return ctx.scene.enter('number')
	})

async function fetch(ctx) {
	return getUserData({
		lang: ctx.session.user.lang,
		id: ctx.session.serviceId,
		personal_account: ctx.session.personalNumber,
		service_id: ctx.session.serviceId,
		region_id: ctx.session.regionNumber,
		sub_region_id: ctx.session.districtNumber,
	})
		.then(async (res) => {
			const data = res.map((val) => `${val.name}: ${val.value}`).join("\n")
			const checkAccount = await Account.getOne(ctx.session.personalNumber)
			if (checkAccount) {
				await Account.create(
					ctx.session.personalNumber,
					data,
					ctx.session.serviceId,
					ctx.session.regionNumber,
					ctx.session.districtNumber,
					ctx.session.user_id
				)
				await User.updateAuth(ctx.session.user_id)
			} else {
				return ctx.reply(ctx.i18n.t('error'))
			}
			ctx.reply(data)
			return ctx.scene.leave('number')
		})
		.catch((err) => {
			console.log(err);
			// ctx.session.leave('number')
			ctx.reply(ctx.i18n.t('error'))
			return ctx.scene.leave('number')
		})
}

module.exports = numberScene;
