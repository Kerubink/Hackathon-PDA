import express from 'express';
import { getAllData } from '../controllers/accommodation.controller.js';  

const router = express.Router();

router.get('/', getAllData);

export default router;
