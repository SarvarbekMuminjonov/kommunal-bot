const { Telegraf, Markup, session, Scenes } = require('telegraf')
const bot = new Telegraf('887636655:AAEMFU4ICvFC-w8Fu0wQyFNdCt7X53SejzY')

const regionScene = require('./scenes/regionsScene')
const numberScene = require('./scenes/numberScene')
const districtScene = require('./scenes/districtScene')
const stage = new Scenes.Stage([regionScene, numberScene, districtScene])
bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {
    ctx.scene.enter('region')
    
     
})

bot.launch().then(res => {
    console.log("Bot started");
    bot.telegram.sendMessage(627059227, "bot started")
})