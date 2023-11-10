const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailerTransporter = require('../nodeMailer/config');
require('dotenv').config();

exports.login = async (req, res) => {
    const user = await User.findOne({
        attributes: ['name', 'id', 'email', 'password', 'isAdmin'],
        where: {
            email: req.body.email
        }
    });

    if (user === null) {
        return res.status(200).json({
            erro: true,
            mensagem: "Usuário ou senha incorreta !!"
        });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(200).json({
            erro: true,
            mensagem: "Usuário ou senha incorreta !!"
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
    try {
        const dados = req.body;

        dados.password = await bcrypt.hash(dados.password, 8);

        // Adicione um token de ativação
        const tokenAtivacao = crypto.randomBytes(20).toString('hex');
        dados.resetPasswordToken = tokenAtivacao;

        await User.create(dados);

        // Envie e-mail de ativação
        const linkAtivacao = `http://localhost:3000/activeaccount?token=${tokenAtivacao}`;
        const emailOptions = {
            from: process.env.GOOGLE_CLIENT_USER,
            to: dados.email,
            subject: 'Ative Sua Conta',
            text: `Clique no link a seguir para ativar sua conta: ${linkAtivacao}`,
        };

        await nodemailerTransporter.sendMail(emailOptions);

        // Retorne uma resposta de sucesso aqui
        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso! Um e-mail de ativação foi enviado.",
        });
    } catch (error) {
        console.error(error);

        // Retorne uma resposta de erro aqui
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao cadastrar o usuário.",
        });
    }
};

exports.AtivarConta = async (req, res) => {

    const { token } = req.query;

    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
            },
        });

        if (!user) {
            return res.status(400).json({
                erro: true,
                mensagem: "Token de ativação inválido ou expirado.",
            });
        }

        // Ative a conta e limpe o token
        user.isActive = true;
        user.resetPasswordToken = null;
        await user.save();

        return res.json({
            erro: false,
            mensagem: "Conta ativada com sucesso!",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: true,
            mensagem: "Erro ao ativar a conta.",
        });
    }
}