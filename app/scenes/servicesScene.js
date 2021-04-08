const { Scenes } = require('telegraf')
const servicesButton = require('../core/keyboards/sevicesButton')
const servicesScene = new Scenes.BaseScene('services')


servicesScene.enter((ctx) => {
    return ctx.editMessageText(ctx.i18n.t('greeting'), servicesButton(ctx.i18n.locale()))
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