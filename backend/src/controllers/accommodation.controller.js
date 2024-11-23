import { sequelize } from '../database/config.js';

export const getAllData = async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT * FROM hotels');
    res.status(200).json(results);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do banco.' });
  }
};
