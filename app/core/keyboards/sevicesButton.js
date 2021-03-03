const {Markup}=require('telegraf')

let ru =[
    'Электр',
    'Газ',
    'Холодная вода',
    'Горячая вода'
]
let uz=[
    'Elektr',
    'Gaz',
    'Sovuq Suv',
    'Issiq Suv'
]
function servicesButton(lang){
    if(lang == 'ru')uz=ru
    return Markup.inlineKeyboard([
        [
            Markup.button.callback(uz[0],'3'),
            Markup.button.callback(uz[1],'166')
        ],
        [
            Markup.button.callback(uz[2],'119'),
            Markup.button.callback(uz[3],'127')
        ]
    ])
}

module.exports = servicesButton