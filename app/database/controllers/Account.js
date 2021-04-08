const db = require('../models/model')
const Account = db.Accounts

function create(id,data,serviceId,regionId,subregionId,userId){
    Account.create({id,data,serviceId,regionId,subregionId,userId})
    .then((res)=>console.log('Account created',res))
    .catch(e=>console.log(e))
}
function update(id,{data,serviceId,regionId,subregionId,userId}){
    Account.update({data,serviceId,regionId,subregionId,userId},
        {where:id}
    )
    .then((res)=>console.log('Account created'))
    .catch(e=>console.log(e))
}
function getAll(userId){
    return Account.findAll({
        where:userId
    })
    
}
function getOne(id){
    return Account.findAll({id})
}

module.exports = {
    create,
    getAll,
    update,
    getOne
}