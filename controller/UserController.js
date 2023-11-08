const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
    const user = await User.findOne({
        attributes: ['name', 'id', 'email', 'password', 'isAdmin'],
        where: {
            email: req.body.email
        }
    });

    if (user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! Nenhum usuário com este e-mail"
        });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! Senha incorreta!"
        });
    }
    const { password, ...userWithoutPassword } = user.toJSON();
    var token = jwt.sign({ id: user.id }, "D62ST92Y7A6V7K5C6W9ZU6W8KS3", {
        expiresIn: '1d'
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token,
        user: userWithoutPassword

    });
};

exports.cadastrar = async (req, res) => {
    var dados = req.body;

    dados.password = await bcrypt.hash(dados.password, 8);

    await User.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não cadastrado com sucesso!"
            });
        });
};

