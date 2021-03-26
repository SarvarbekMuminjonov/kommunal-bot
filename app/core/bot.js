const { Telegraf, Scenes, session } = require("telegraf")
const { TOKEN ,URL , PORT,DEV_ID} = require("../config/index.js")
const { Stage } = Scenes
const express = require("express")
const app = express()
console.log("TOKEN", TOKEN);
const bot = new Telegraf(TOKEN)
const scenes = require("../scenes")
const stage = new Stage(scenes)

app.use(bot.webhookCallback(`/bot${TOKEN}`))

bot
.use(session())
.use(stage.middleware())
  .start((ctx) => ctx.scene.enter("lang"))
  .on("text", (ctx) => ctx.scene.enter("lang"))
// .launch()
// .then((res) => {
// 	console.log("Bot started")
	//bot.telegram.sendMessage(DEV_ID, "bot started")
  // })
  bot.telegram.setWebhook(`${URL}/bot${TOKEN}`).then(res => {
    
    bot.telegram.sendMessage(DEV_ID, "bot started")
})

app.listen(PORT || 8000, () => {
  console.log(`Server running on port ${PORT}`)
})
