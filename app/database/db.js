const { Sequelize } = require('sequelize')
const{
    db_name,
    db_port,
    dialect,
    user_name,
    password,
    host
}=require('../config/index')

module.exports = new Sequelize(
    db_name,
    user_name,
    password,{
        dialect:dialect,
        host:host,
        port:db_port
    }
)