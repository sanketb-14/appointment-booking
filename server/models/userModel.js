const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const user = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },

    username: {
        type: DataTypes.STRING,

        allowNull: false,


    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },
    phone: {
        type: DataTypes.INTEGER,
    },
    userImg: {
        type: DataTypes.STRING,
        default: "https://static.vecteezy.com/system/resources/previews/007/069/364/non_2x/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
    },

}, {
    timestamps: false
}
);

module.exports = user;
