import express from 'express';
import { getAllData } from '../controllers/accommodation.controller.js';  
import { createAccommodation } from '../controllers/accommodationPost.controller.js';
import { updateAccommodation } from '../controllers/accommodationPut.controller.js';
import { deleteAccommodation } from '../controllers/accommodationDelete.controller.js';

const router = express.Router();


router.get('/', getAllData); 
router.post('/', createAccommodation); 
router.put('/accommodations/:id', updateAccommodation); 
router.delete('/accommodations/:id', deleteAccommodation); 

export default router;
