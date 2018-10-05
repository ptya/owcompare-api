const express = require('express');

const router = express.Router();
const { sanitizeParam } = require('express-validator/filter');
const heroController = require('../controllers/heroController');
const scoreController = require('../controllers/scoreController');
const { catchErrors } = require('../middlewares/error');
const tester = require('./tester');

router.use('/tester', tester);

router.get('/api/heroes', catchErrors(heroController.getHeroes));
router.get('/api/hero/:hero', sanitizeParam('hero').trim(), catchErrors(heroController.getHero));
router.get(
  '/api/scores/:hero',
  sanitizeParam('hero').trim(),
  catchErrors(scoreController.getScores)
);

module.exports = router;
