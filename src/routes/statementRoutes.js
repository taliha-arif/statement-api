const express = require('express');
const router = express.Router();
const statementController = require('../controllers/statementController');

router.post('/', statementController.generateStatement);
router.get('/:jobId', statementController.downloadStatement);


module.exports = router;
