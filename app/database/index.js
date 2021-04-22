const express =require('express')
const sequelize = require('./db')
const app =express()
const User = require('./controllers/User')
const cors = require('cors')

app.use(cors)

async function start(){
    try {
       await sequelize.authenticate()
       await sequelize.sync()
        // await swsequelize.drop()
       console.log('connected')
    } catch (error) {
        console.log(error)
    }
}
module.exports = start