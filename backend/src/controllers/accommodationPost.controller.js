import { sequelize } from '../database/config.js';

export const createAccommodation = async (req, res) => {
  try {
    const {
      name,
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

    
    if (!name || !stars || !latitude || !longitude || !address || !city || !state || !country || !placeId) {
      return res.status(400).json({ error: 'Campos obrigatórios estão faltando.' });
    }

    const query = `
      INSERT INTO hotels 
      (name, stars, latitude, longitude, description, address, district, city, state, country, placeId, thumb, images, amenities, pois, reviews, cnpj, createdAt, updatedAt)
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    await sequelize.query(query, {
      replacements: [
        name,
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
