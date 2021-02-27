const {Markup} = require('telegraf')
const json = require('../../regionsEAC.json')
let arr = json

module.exports = function buttonGenerator(regIndex, length) {
    let btnarr = []

    let btn = []
    for (let i = 0; i < length; i++) {
        btnarr.push(Markup.button.callback(arr[regIndex].Children.Area[i].Name,
            arr[regIndex].Children.Area[i].Code)
        )
        if ((i + 1) % 2 == 0) {
            btn.push(btnarr)
            btnarr = []
        }
        if (length % 2 == 1 && i == length - 1) btn.push(btnarr)

    }
    btn.push([Markup.button.callback('Ortga qaytish','orqaga')])
    return Markup.inlineKeyboard(btn)
}


   