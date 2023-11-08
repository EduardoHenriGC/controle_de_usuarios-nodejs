const User = require('../models/User');

exports.listarUsuarios = async (req, res) => {
    await User.findAll({
        attributes: ['id', 'name', 'email'],
        order: [['id', "DESC"]]
    })
        .then((users) => {
            return res.json({
                erro: false,
                users,
                id_usuario_logado: req.userId

            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuário encontrado!"
            });
        });
};

exports.isAdmin = async (req, res) => {
    const loginId = req.params.userId; // Obtenha o ID do usuário a partir do parâmetro da URL
    const loginEmail = req.params.userEmail; // Obtenha o email do usuário a partir do parâmetro da URL
    const user = await User.findByPk(loginId);

    // Verifique se o email do login corresponde ao email do usuário no banco de dados
    if (user && user.email === loginEmail) {
        return res.json({
            isAdmin: user.isAdmin, // O usuário é um administrador se o email corresponder
        });
    } else {
        return res.json({
            isAdmin: false, // O email não corresponde ao usuário no banco de dados
        });
    }
};
