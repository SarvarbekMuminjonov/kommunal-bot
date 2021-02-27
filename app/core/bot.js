const { Telegraf, Markup, session, Scenes } = require('telegraf')
const bot = new Telegraf('887636655:AAEMFU4ICvFC-w8Fu0wQyFNdCt7X53SejzY')

const regionScene = require('./scenes/regionsScene')
const numberScene = require('./scenes/numberScene')
const districtScene = require('./scenes/districtScene')
const servicesButton = require('./keyboards/sevicesButton')
const greeting = `Assalomu Alaykum Kommunal botga
Xush kelibsiz!.O\'zingiz tekshirmoqchi
bo\'gan xizmat turini tanlang.`
const stage = new Scenes.Stage([regionScene, numberScene, districtScene])
bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {
    return bot.telegram.sendMessage(ctx.chat.id,
           greeting,
           servicesButton
        )
})
bot.action(/.+/,(ctx)=>{
    if(ctx.match[0] == 'elektr'){
        ctx.deleteMessage()
        ctx.scene.enter('region')
        return ctx.answerCbQuery('Ok')
    }
})

bot.launch().then(res => {
    console.log("Bot started");
    bot.telegram.sendMessage(627059227, "bot started")
})