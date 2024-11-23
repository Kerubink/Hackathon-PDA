// app.js
const express = require('express');
const sequelize = require('./config/database');
const getAllRoutes = require('./routes/getAllRoutes');

const app = express();

app.use(express.json());

app.use('/api/data', getAllRoutes);

const PORT = 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados.');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco:', error);
  });
