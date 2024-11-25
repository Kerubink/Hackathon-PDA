import express from 'express';
import { getAllData, createAccommodation, updateAccommodation, deleteAccommodation  } from '../controllers/accommodation.controller.js';  

const router = express.Router();


router.get('/', getAllData); 
router.post('/', createAccommodation); 
router.put('/accommodations/:id', updateAccommodation); 
router.delete('/accommodations/:id', deleteAccommodation); 

export default router;
