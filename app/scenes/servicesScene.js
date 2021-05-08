const { Scenes } = require('telegraf')
const servicesButton = require('../core/keyboards/sevicesButton')
const servicesScene = new Scenes.BaseScene('services')


servicesScene
    .enter((ctx) => {
        console.log(ctx.session.user)
        if (ctx.session.lang)
            ctx.i18n.locale(ctx.session.lang)
        return ctx.editMessageText(ctx.i18n.t('greeting'), servicesButton(ctx.i18n.locale()))
    })

    .action(/.+/, (ctx) => {

        switch (ctx.match[0]) {
            case '3': ctx.session.serviceId = ctx.match[0]
                ctx.answerCbQuery()
                ctx.scene.enter('region')
                break
            case '166': ctx.session.serviceId = ctx.match[0]
                ctx.answerCbQuery()
                ctx.scene.enter('region')
                break
            case '119': ctx.session.serviceId = ctx.match[0]
                ctx.answerCbQuery()
                ctx.scene.enter('region')
                break
            case '127': ctx.session.serviceId = ctx.match[0]
                ctx.answerCbQuery()
                ctx.scene.enter('region')
                break
        }
    })
    .on('message', (ctx) => {
        ctx.deleteMessage()
        return ctx.scene.enter('services')
    })

module.exports = servicesScene