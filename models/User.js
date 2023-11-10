const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: Sequelize.DATE,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    resetPasswordToken: {
        type: Sequelize.STRING,
    },
    resetPasswordTokenExpiry: {
        type: Sequelize.DATE,
    }
});

// Criar a tabela
//User.sync();

module.exports = User;
