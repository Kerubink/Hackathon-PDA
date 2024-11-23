import express from 'express';
import {
  getAllItemsController,
  createItemController,
  updateItemController,
  deleteItemController,
} from '../controllers/accommodation.controller';

const router = express.Router();


router.get('/items', getAllItemsController); 
router.post('/items', createItemController); 
router.put('/items/:id', updateItemController); 
router.delete('/items/:id', deleteItemController); 

export default router;
