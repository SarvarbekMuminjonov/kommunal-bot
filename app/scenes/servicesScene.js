const { Scenes } = require('telegraf')
const servicesButton = require('../core/keyboards/sevicesButton')
const servicesScene = new Scenes.BaseScene('services')
const greeting = `Assalomu Alaykum Kommunal botga
Xush kelibsiz!.O\'zingiz tekshirmoqchi
bo\'gan xizmat turini tanlang.`


servicesScene.enter((ctx) => {
    return ctx.reply(greeting, servicesButton)
})

servicesScene.action(/.+/, (ctx) => {
    switch (ctx.match[0]) {
        case '0':ctx.session.serviceId = ctx.match[0]
        ctx.answerCbQuery('Elektrni tanladingiz')
        ctx.scene.enter('region')
        break
        case '1':ctx.session.serviceId = ctx.match[0]
        ctx.answerCbQuery('Gazni tanladingiz')
        ctx.scene.enter('region')
        break
        case '2':ctx.session.serviceId = ctx.match[0]
        ctx.answerCbQuery('Sovuq suvni tanladingiz')
        ctx.scene.enter('region')
        break
        case '3': ctx.session.serviceId = ctx.match[0]
        ctx.answerCbQuery('Elektrni tanladingiz')
        ctx.scene.enter('region')
        break
    }
})

module.exports = servicesScene