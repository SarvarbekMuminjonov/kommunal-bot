const { Scenes } = require('telegraf')
const servicesButton = require('../core/keyboards/sevicesButton')
const servicesScene = new Scenes.BaseScene('services')
let greeting = `Assalomu Alaykum Kommunal botga
Xush kelibsiz!.O\'zingiz tekshirmoqchi
bo\'gan xizmat turini tanlang.`
let greetingRu = `Привет и добро пожаловать в 
коммунальный бот.Выберите услугу,
которую хотите проверить
`


servicesScene.enter((ctx) => {
    // ctx.deleteMessage()
    if(ctx.session.lang == 'ru')greeting=greetingRu
    return ctx.editMessageText(greeting, servicesButton(ctx.session.lang))
})

servicesScene.action(/.+/, (ctx) => {
    switch (ctx.match[0]) {
        case '3':ctx.session.serviceId = ctx.match[0]
        ctx.answerCbQuery('ok')
        ctx.scene.enter('region')
        break
        case '166':ctx.session.serviceId = ctx.match[0]
        ctx.answerCbQuery('ok')
        ctx.scene.enter('region')
        break
        case '119':ctx.session.serviceId = ctx.match[0]
        ctx.answerCbQuery('ok')
        ctx.scene.enter('region')
        break
        case '127': ctx.session.serviceId = ctx.match[0]
        ctx.answerCbQuery('ok')
        ctx.scene.enter('region')
        break
    }
})

module.exports = servicesScene