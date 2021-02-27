const {Markup}=require('telegraf')
const servicesButton = Markup.inlineKeyboard([
    [
        Markup.button.callback('Elektr','elektr'),
        Markup.button.callback('Gaz','gaz')
    ],
    [
        Markup.button.callback('Sovuq Suv','sovuqSuv'),
        Markup.button.callback('Issiq Suv','issiqSuv')
    ]
])

module.exports = servicesButton