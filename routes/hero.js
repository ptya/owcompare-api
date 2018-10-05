const express = require('express');
const { sanitizeParam } = require('express-validator/filter');
const heroController = require('../controllers/heroController');
const { catchErrors } = require('../middlewares/error');

const router = express.Router();

router.get('/:hero', sanitizeParam('hero').trim(), catchErrors(heroController.getHero));

module.exports = router;
