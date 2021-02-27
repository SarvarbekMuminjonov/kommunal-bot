const json = require('../../regionsEAC.json')
const { Markup,  Scenes } = require('telegraf')
const buttonGenerator = require('../keyboards/buttuonGenerator')

const districtScene = new Scenes.BaseScene('district')
let arr = json

districtScene.enter(ctx => {
    ctx.deleteMessage()
    ctx.reply('Tuman yoki shahringizni tanlang', {
        ...buttonGenerator(ctx.session.regIndex, arr[ctx.session.regIndex].Children.Area.length)
    })

})
districtScene.action(/.+/, (ctx => {
    if(ctx.match[0] == 'orqaga'){
        ctx.scene.enter('region')
        ctx.answerCbQuery('ok')
    }
    else 
    {   
        ctx.session.districtNumber = ctx.match[0] 
        console.log(ctx.session.districtNumber)
        ctx.answerCbQuery('ok')
        return ctx.scene.enter('number')
    }
}))



module.exports = districtScene