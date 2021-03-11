const {Scenes, Markup}=require('telegraf')

const chooseText = `Assalomu alaykum tilni tanlang.
---------
Выберите язык.`
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

languageScene.action(/.+/,ctx=>{
    ctx.session.lang = ctx.match[0]
    return ctx.scene.enter('services')
})

module.exports = languageScene