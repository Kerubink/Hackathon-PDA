
export const getAllItemsController = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error('Erro no controlador:', error.message);
    res.status(500).json({ error: 'Erro ao buscar os itens' });
  }
};

export const createItemController = async (req, res) => {
  try {
    const { name, category, price } = req.body;

    const newItem = await Item.create({ name, category, price });

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Erro no controlador (POST):', error.message);
    res.status(500).json({ error: 'Erro ao criar o item' });
  }
};

export const updateItemController = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, category, price } = req.body;

    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    await item.update({ name, category, price });

    res.status(200).json(item);
  } catch (error) {
    console.error('Erro no controlador (PUT):', error.message);
    res.status(500).json({ error: 'Erro ao atualizar o item' });
  }
};


export const deleteItemController = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

  
    await item.destroy();

    res.status(200).json({ message: 'Item removido com sucesso' });
  } catch (error) {
    console.error('Erro no controlador (DELETE):', error.message);
    res.status(500).json({ error: 'Erro ao remover o item' });
  }
};


