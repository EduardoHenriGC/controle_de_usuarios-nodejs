const express = require('express');
const cors = require('cors');
const app = express();
const { eAdmin } = require('./middlewares/auth');

const UserController = require('./controller/UserController');
const PasswordController = require('./controller/PasswordController');
const AdminController = require('./controller/AdminController');

app.use(express.json());
app.use(cors());


app.post('/cadastrar', UserController.cadastrar);
app.post('/login', UserController.login);
app.post('/recuperar-senha', PasswordController.recuperarSenha);
app.post('/redefinir-senha', PasswordController.redefinirSenha);
app.get('/', eAdmin, AdminController.listarUsuarios)
app.get('/is-admin/:userId/:userEmail', AdminController.isAdmin)


app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});