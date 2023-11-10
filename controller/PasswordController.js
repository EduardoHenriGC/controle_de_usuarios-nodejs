const crypto = require('crypto');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailerTransporter = require('../nodeMailer/config');
require('dotenv').config();

exports.recuperarSenha = async (req, res) => {
    const { email } = req.body;

    // Verificar se o email existe no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({
            erro: true,
            mensagem: "E-mail não encontrado no banco de dados."
        });
    }

    // Gerar um token de redefinição de senha e salvar no banco de dados
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // Token válido por 1 hora
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = resetTokenExpiry;
    await user.save();

    // Envia um email com o link de redefinição de senha
    const resetPasswordLink = `http://localhost:3000/resetpassword?token=${resetToken}`;

    // Configuração do email
    const mailOptions = {
        from: process.env.GOOGLE_CLIENT_USER,
        to: email,
        subject: 'Recuperação de Senha',
        text: `Clique no link a seguir para redefinir sua senha: ${resetPasswordLink}`,
    };


    nodemailerTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao enviar o email de redefinição de senha."
            });
        }
        return res.json({
            erro: false,
            mensagem: "E-mail de redefinição de senha enviado com sucesso."
        });
    });
};

exports.redefinirSenha = async (req, res) => {
    const { token, novaSenha } = req.body;

    // Verificar se o token é válido e ainda está dentro do prazo de validade
    const user = await User.findOne({ where: { resetPasswordToken: token } });
    if (!user || user.resetPasswordTokenExpiry < Date.now()) {
        return res.status(400).json({
            erro: true,
            mensagem: "Token de redefinição de senha inválido ou expirado."
        });
    }

    // Redefinir a senha do usuário e limpar os campos de redefinição
    user.password = await bcrypt.hash(novaSenha, 8);
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiry = null;
    await user.save();

    return res.json({
        erro: false,
        mensagem: "Senha redefinida com sucesso."
    });
};




