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
    Account.findAll({
        where:userId
    })
    .then(res=>{
        console.log(res)
        return res
    })
}
function getOne(id){
    return Account.findByPk(id)
}

module.exports = {
    create,
    getAll,
    update,
    getOne
}