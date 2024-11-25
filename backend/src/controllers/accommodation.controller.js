import { sequelize } from '../database/config.js';
import { filterByKeyword } from '../services/hotelService.js';

export const getAllData = async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT * FROM hotels');
    const { keyword } = req.query;

    if (keyword) {
      try {
        const filteredResults = filterByKeyword(results, keyword);
        return res.status(200).json(filteredResults);
      } catch (filterError) {
        return res.status(400).json({ error: filterError.message });
      }
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do banco.' });
  }
};
