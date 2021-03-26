const {Markup}=require('telegraf')
let lang=[]
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
    if(lang == 'ru')lang=ru
    else lang =uz
    return Markup.inlineKeyboard([
        [
            Markup.button.callback(lang[0],'3'),
            Markup.button.callback(lang[1],'166')
        ],
        [
            Markup.button.callback(lang[2],'119'),
            Markup.button.callback(lang[3],'127')
        ]
    ])
}

module.exports = servicesButton