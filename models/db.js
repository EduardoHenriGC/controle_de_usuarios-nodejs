const Sequelize = require('sequelize');

const sequelize = new Sequelize("users_control", "root", "12345", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizado com sucesso!");
    }).catch((erro) => {
        console.log("Erro: Conexão com o banco de dados não realizado com sucesso! Erro gerado: " + erro);
    });

module.exports = sequelize;
