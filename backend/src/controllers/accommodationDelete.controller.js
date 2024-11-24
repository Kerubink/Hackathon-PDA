import { sequelize } from '../database/config.js';

export const deleteAccommodation = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ error: 'ID da acomodação é obrigatório.' });
      }
  
      const query = `
        DELETE FROM hotels 
        WHERE id = ?
      `;
  
      const [result] = await sequelize.query(query, {
        replacements: [id],
      });
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Acomodação não encontrada.' });
      }
  
      res.status(200).json({ message: 'Acomodação deletada com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar acomodação:', error);
      res.status(500).json({ error: 'Erro ao excluir dados do banco.' });
    }
  };
  