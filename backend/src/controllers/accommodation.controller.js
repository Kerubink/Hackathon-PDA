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

export const createAccommodation = async (req, res) => {
  try {
    const {
      name,
      type,
      stars,
      latitude,
      longitude,
      description,
      address,
      district,
      city,
      state,
      country,
      placeId,
      thumb,
      images,
      amenities,
      pois,
      reviews,
      cnpj,
    } = req.body;

    
    if (!name || !type || !stars || !latitude || !longitude || !address || !city || !state || !country || !placeId) {
      return res.status(400).json({ error: 'Campos obrigatórios estão faltando.' });
    }

    const query = `
      INSERT INTO hotels 
      (name, type, stars, latitude, longitude, description, address, district, city, state, country, placeId, thumb, images, amenities, pois, reviews, cnpj, createdAt, updatedAt)
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    await sequelize.query(query, {
      replacements: [
        name,
        type,
        stars,
        latitude,
        longitude,
        description,
        address,
        district,
        city,
        state,
        country,
        placeId,
        thumb,
        JSON.stringify(images || null),
        JSON.stringify(amenities || null),
        JSON.stringify(pois || null),
        JSON.stringify(reviews || null),
        cnpj || null,
      ],
    });

    res.status(201).json({ message: 'Acomodação criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar acomodação:', error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
};

export const updateAccommodation = async (req, res) => {
  try {
    const {
      name,
      type,
      stars,
      latitude,
      longitude,
      description,
      address,
      district,
      city,
      state,
      country,
      placeId,
      thumb,
      images,
      amenities,
      pois,
      reviews,
      cnpj,
    } = req.body;

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID da acomodação é obrigatório.' });
    }

    const query = `
      UPDATE hotels 
      SET 
        name = ?,
        type =?,
        stars = ?,
        latitude = ?,
        longitude = ?,
        description = ?,
        address = ?,
        district = ?,
        city = ?,
        state = ?,
        country = ?,
        placeId = ?,
        thumb = ?,
        images = ?,
        amenities = ?,
        pois = ?,
        reviews = ?,
        cnpj = ?,
        updatedAt = NOW()
      WHERE id = ?
    `;

    const [result] = await sequelize.query(query, {
      replacements: [
        name,
        type,
        stars,
        latitude,
        longitude,
        description,
        address,
        district,
        city,
        state,
        country,
        placeId,
        thumb,
        JSON.stringify(images || null),
        JSON.stringify(amenities || null),
        JSON.stringify(pois || null),
        JSON.stringify(reviews || null),
        cnpj || null,
        id,
      ],
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Acomodação não encontrada.' });
    }

    res.status(200).json({ message: 'Acomodação atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar acomodação:', error);
    res.status(500).json({ error: 'Erro ao atualizar dados no banco.' });
  }
};



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
