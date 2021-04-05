const {Scenes,Markup} = require('telegraf')
const {User , Account} = require('../database/controllers/main')
const getAccountsKeyboard = require('../core/keyboards/accountsButton')
const accountScene = new Scenes.BaseScene('account')
    .enter(async(ctx)=>{
    //    const accounts = await Account.getAll(ctx.session.user_id )
    //    console.log(accounts)
    let array =  await Account.getAll(ctx.session.user_id)
    
        ctx.reply( 'xisoblar',getAccountsKeyboard(array))
        return ctx.scene.leave('account')
    //    return ctx.reply(accounts)
    })
    

module.exports = accountScene