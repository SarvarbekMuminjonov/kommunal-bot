const {Markup}=require('telegraf')
const servicesButton = Markup.inlineKeyboard([
    [
        Markup.button.callback('Elektr','0'),
        Markup.button.callback('Gaz','1')
    ],
    [
        Markup.button.callback('Sovuq Suv','2'),
        Markup.button.callback('Issiq Suv','3')
    ]
])

module.exports = servicesButton