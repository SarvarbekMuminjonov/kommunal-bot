const {DataTypes} =require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true
    },  
    lang : {
        type:DataTypes.STRING,
    },
    auth:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},
{
    tableName:'users'
})

const Accounts = sequelize.define('accounts',{
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        
    },
    data:{
        type:DataTypes.JSON
    },
    serviceId:{
        type:DataTypes.INTEGER
    },
    regionId:{
        type:DataTypes.INTEGER
    },
    subregionId:{
        type:DataTypes.INTEGER
    },
    userId:{
        type:DataTypes.INTEGER
    },
},{
    tableName:'accounts'
})

User.hasMany(Accounts)
Accounts.belongsTo(User)

module.exports = {
   User,
   Accounts
}