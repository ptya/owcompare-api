const express = require('express');
const Hero = require('../models/Hero');

const router = express.Router();

router.get('/:hero', async (req, res, next) => {
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
