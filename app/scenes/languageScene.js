const {Scenes, Markup,}=require('telegraf')
const { User }=require('../database/controllers/main')
const chooseText = `Assalomu alaykum tilni 
tanlang.
---------
Привет Выберите язык.`
const languageScene = new Scenes.BaseScene('lang')

languageScene.enter((ctx)=>{
    ctx.reply(chooseText,
    Markup.inlineKeyboard([
        Markup.button.callback('O\'zbek','uz'),
        Markup.button.callback('Rus','ru')
    ])
    )
    // .then(msgInfo=>console.log(msgInfo))
})

languageScene.action(/.+/,async ctx=>{
    ctx.session.lang = ctx.match[0]
    ctx.i18n.locale(ctx.session.lang)
    // await User.updateLang(ctx.session.user_id,ctx.session.lang)
    return ctx.scene.enter('services')
})

module.exports = languageScene