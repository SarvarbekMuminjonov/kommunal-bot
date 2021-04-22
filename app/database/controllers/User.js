
const db = require('../models/model')
const User = db.User

function create(id) {
    User.create({ id })
        .then(() => {
            console.log('created')

        })
        .catch(e => {
            console.log(e)
        })
}
// function updateLang(id, lang) {
//     User.update({
//         lang: lang
//     }, {
//         where:{
//             id:id
//         }
//     })
// }

function updateAuth(id) {
    User.update({
        auth: true
    }, {
        where:{
            id:id
        }
    })
}

function destroy(id) {
    User.destroy({ where: id })
        .then(() => {
            console.log('deleted')

        })
        .catch(e => {
            console.log(e)
        })
}

function getOne(id) {
    return User.findByPk(id)
}

const getAll = () => {
    return User.findAll()
}
module.exports = {
    create,
    getAll,
    getOne,
    destroy,
    updateAuth,
    // updateLang
}