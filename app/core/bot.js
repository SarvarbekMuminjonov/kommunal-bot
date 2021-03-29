const { Telegraf, Scenes, session } = require("telegraf");
const { TOKEN, URL, PORT, DEV_ID } = require("../config/index.js");
const { Stage } = Scenes;
const express = require("express");
const app = express();

const bot = new Telegraf(TOKEN);
const scenes = require("../scenes");
const stage = new Stage(scenes);

// bot.telegram.setWebhook(`${URL}/bot${TOKEN}`)
// app.use(bot.webhookCallback(`/bot${TOKEN}`))

bot
	.use(session())
	.use(stage.middleware())
	.start((ctx) => ctx.scene.enter("lang"))
	.on("text", (ctx) => {
		console.log(ctx.message.text);
		return ctx.scene.enter("lang");
	})
	.launch()
	.then((res) => {
		console.log("Bot started");
		bot.telegram.sendMessage(DEV_ID, "bot started");
	});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
