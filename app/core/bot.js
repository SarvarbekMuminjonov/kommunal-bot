const { Telegraf, Scenes, session } = require("telegraf")
const TelegrafI18n = require('telegraf-i18n')
const { TOKEN, URL, PORT, DEV_ID, DEV_TOKEN } = require("../config")
const { Stage } = Scenes
const path = require('path')
const express = require("express")
const app = express()
const { User, Account } = require('../database/controllers/main')
const bot = new Telegraf(DEV_TOKEN)
const scenes = require("../scenes")
const stage = new Stage(scenes)
const i18n = new TelegrafI18n({
	directory: path.resolve(path.resolve(__dirname, '../locales')),
	defaultLanguage: "uz",
	sessionName: "session",
	useSession: true,
	templateData: {
		pluralize: TelegrafI18n.pluralize,
	},
})


// bot.telegram.setWebhook(`${URL}/bot${TOKEN}`)
// app.use(bot.webhookCallback(`/bot${TOKEN}`))

bot
	.use(session())
	.use(i18n.middleware())
	.use(stage.middleware())
	.use(async (ctx, next) => {
		//console.log(ctx.i18n.locale())
		if (ctx.session.auth || ctx.session.authing) {
			return next()
		} else {
			const user = await User.getOne(ctx.from.id)
			// console.log(user)
			if (user  && user.auth) {
				ctx.session.auth = true
				ctx.session.user = user.toJSON()
				return ctx.scene.enter('account')
			} else {
				ctx.session.user_id = ctx.from.id
				if (!user) {
					// ctx.session.user_id = ctx.from.id
					ctx.session.user = await User.create(ctx.session.user_id)
					console.log('created')
				}
				return ctx.scene.enter("lang")
			}
		}
	})
	.on("text", (ctx) => {
		console.log(ctx.message.text)
		return ctx.scene.enter("lang")
	})
	.launch()
	.then((res) => {
		console.log("Bot started")
		// bot.telegram.sendMessage(DEV_ID, "bot started")
	})

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
