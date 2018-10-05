const express = require('express');
const { sanitizeParam } = require('express-validator/filter');

const Hero = require('../models/Hero');
const Score = require('../models/Score');

const router = express.Router();

router.get('/:hero', sanitizeParam('hero').trim(), async (req, res, next) => {
  try {
    const hero = await Hero.findOne({ slug: req.params.hero });
    if (!hero) {
      throw new Error('Invalid hero name.');
    }
    const resp = await Score.find({ primaryHero: hero });

    const scores = {};
    Object.values(resp).forEach(item => {
      scores[item.score] = item.heroes;
    });

    res.json(scores);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
