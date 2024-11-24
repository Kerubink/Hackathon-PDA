export const updateAccommodation = async (req, res) => {
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
  
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ error: 'ID da acomodação é obrigatório.' });
      }
  
      const query = `
        UPDATE hotels 
        SET 
          name = ?,
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
  