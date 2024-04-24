const { DataTypes } = require('sequelize');
const db = require('../util/database');

function Table() {
    return db.define('Table', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },

    }, {

        timestamps: false,
    });
}

module.exports = Table;

