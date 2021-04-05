
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

function destroy(id){
    User.destroy({where:id})
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
    destroy
}