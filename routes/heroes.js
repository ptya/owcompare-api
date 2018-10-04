const express = require('express');
const Hero = require('../models/Hero');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
