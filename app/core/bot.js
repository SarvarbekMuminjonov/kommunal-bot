const { Telegraf, Scenes, session } = require("telegraf");
const TelegrafI18n= require('telegraf-i18n')
const { TOKEN, URL, PORT, DEV_ID,DEV_TOKEN } = require("../config/index.js");
const { Stage } = Scenes;
const path = require('path')
const express = require("express");
const app = express();
const User = require('../database/controllers/User')
const start = require('../database/index')
const bot = new Telegraf(DEV_TOKEN);
const scenes = require("../scenes");
const stage = new Stage(scenes);
const i18n = new TelegrafI18n({
	directory: path.resolve(path.resolve(__dirname,'../locales')),
	defaultLanguage: "ru",
	sessionName: "session",
	useSession: true,
	templateData: {
	 	pluralize: TelegrafI18n.pluralize
	}
  })

// bot.telegram.setWebhook(`${URL}/bot${TOKEN}`)
// app.use(bot.webhookCallback(`/bot${TOKEN}`))

bot
	.use(i18n.middleware())
	.use(session())
	.use(stage.middleware())
	.start((ctx)=> {
		// start()
		console.log(ctx.i18n.locale());
		if( User.getOne(ctx.from.id)){
			return ctx.scene.enter('account')
		} else {
			ctx.session.user_id = ctx.from.id
			User.create(ctx.session.user_id)
			return ctx.scene.enter("lang")
		}
	})
	.on("text", (ctx) => {
		console.log(ctx.message.text);
		return ctx.scene.enter("lang");
	})
	.launch()
	.then((res) => {
		console.log("Bot started");
		// bot.telegram.sendMessage(DEV_ID, "bot started");
	});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
