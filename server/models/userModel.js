const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); 

const user = sequelize.define('user', {
    
    username: {
        type: DataTypes.STRING,
        allowNull: false
       
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        
    },
    phone: {
        type: DataTypes.INTEGER,
    },
    userImg:{
        type: DataTypes.STRING,
    },
  
}, {
    timestamps: false 
}
);

module.exports =user;
