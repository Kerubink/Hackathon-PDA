import express from 'express';
import { getAllData } from '../controllers/accommodation.controller.js';  
import { createAccommodation } from '../controllers/accommodationPost.controller.js';

const router = express.Router();

router.get('/', getAllData);
router.post('/', createAccommodation);


export default router;
