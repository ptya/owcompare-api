const express = require('express');
const { sanitizeParam } = require('express-validator/filter');
const scoreController = require('../controllers/scoreController');
const { catchErrors } = require('../middlewares/error');

const router = express.Router();

router.get('/:hero', sanitizeParam('hero').trim(), catchErrors(scoreController.getScores));

module.exports = router;
