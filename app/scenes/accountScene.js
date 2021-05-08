const { Scenes } = require('telegraf')
const { User, Account } = require('../database/controllers/main')
const getAccountsKeyboard = require('../core/keyboards/accountsButton')
const getUserData = require("../services/exemple")
const accountScene = new Scenes.BaseScene('account')
    .enter(async (ctx) => {
        // const accounts = await Account.getAll(ctx.session.user_id )
        //    console.log(accounts)
        const user = await User.getOne(ctx.from.id)
        ctx.session.user = user.toJSON()
        ctx.i18n.locale(ctx.session.user.lang)
        let str = ctx.i18n.t('newAccount')
        let array = await Account.getAll(ctx.session.user_id)
        let obj = getAccountsKeyboard(array, str)
        ctx.reply(obj.data || ctx.i18n.t('notFound'), obj.keyboard)
        return ctx.scene.leave('account')
        //    return ctx.reply(accounts)
    })
    .action(/.+/, async ctx => {
        const user = await User.getOne(ctx.from.id)
        ctx.i18n.locale(ctx.session.user.lang)
        if (ctx.match[0] == 'new') {
            ctx.answerCbQuery()
            return ctx.scene.enter('services')
        } else {
            // console.log('match', ctx.match[0])
            ctx.answerCbQuery()
            let array = await Account.getAll(ctx.session.user_id)
            let str = ctx.i18n.t('newAccount')
            let obj = getAccountsKeyboard(array, str)
            let data = await (Account.getOne(ctx.match[0]))
            let result = JSON.parse(JSON.stringify(data[0]))
            return getUserData({
                lang: ctx.session.user.lang,
                id: result.serviceId,
                personal_account: result.id,
                service_id: result.serviceId,
                region_id: result.regionId,
                sub_region_id: result.subregionId,
            })
                .then((res) => {
                    // console.log(res)
                    const data = res.map((val) => `${val.name}: ${val.value}`).join("\n")
                    Account.update(result.id, data)
                    return ctx.editMessageText(
                        result.updatedAt.toString().slice(0,24)+'\n'+data,
                        obj.keyboard
                    )
                })
                .catch((err) => {
                    console.log(err);
                    // ctx.session.leave('number')
                    ctx.reply(err)
                    return ctx.scene.leave('account')
                })
        }
    })
    .on('message', (ctx) => {
        ctx.deleteMessage()
        return ctx.scene.enter('account')
    })


module.exports = accountScene