const sequelize = require('../config/database');

const getAllData = async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT * FROM your_table_name');
    res.status(200).json(results);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do banco.' });
  }
};

module.exports = { getAllData };
