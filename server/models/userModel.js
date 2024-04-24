const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

function UserModel(tableName) {
    return sequelize.define(tableName, {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: true,
            defaultValue: null
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
        },


    }, {
        freezeTableName: true,


    })
}

module.exports = UserModel;
