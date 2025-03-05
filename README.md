
# controle_de_usuarios-nodejs

## Getting Started

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1. Clone o repositório

```bash
git clone https://github.com/EduardoHenriGC/controle_de_usuarios-nodejs.git
```
### 2. Navegue até a pasta do projeto

```bash
cd controle_de_usuarios-nodejs
```

### 3. Instale as dependências

```bash
npm install
```
### 4. Configure o banco de dados

```bash
no arquivo db.js dentro da pasta Model coloque seu usuario e senha mysql ou configure com algum banco de sua preferencia.

const sequelize = new Sequelize("users_control", "root", "12345", {
    host: "localhost",
    dialect: "mysql"
});

crie no banco uma database chamado "users_control"
```


### 5. Inicie o servidor de desenvolvimento

```bash
npm run start
```

### 4. Acesse o projeto no navegador

Abra [http://localhost:8080](http://localhost:8080) para ver o resultado.

