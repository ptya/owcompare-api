const express = require('express');
const { sanitizeParam } = require('express-validator/filter');
const Hero = require('../models/Hero');

const router = express.Router();

router.get('/:hero', sanitizeParam('hero').trim(), async (req, res, next) => {
  try {
    const hero = await Hero.findOne({ slug: req.params.hero });
    if (!hero) {
      throw new Error('Invalid hero name.');
    }
    res.json(hero);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
