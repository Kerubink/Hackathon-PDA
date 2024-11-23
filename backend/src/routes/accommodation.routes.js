const express = require('express');
const { getAllData } = require('../controllers/getAllController');

const router = express.Router();

router.get('/', getAllData);

module.exports = router;
