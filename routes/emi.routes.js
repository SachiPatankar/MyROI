const express = require('express');
const router = express.Router();
const emiController = require('../controllers/emi.controller');

router.post('/calculate-emi', emiController.calculateEMI);
router.get('/emis', emiController.getEMIs);
router.get('/emi/:id', emiController.getEMIById);

module.exports = router;
