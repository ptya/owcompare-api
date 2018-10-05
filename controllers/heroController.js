const Hero = require('../models/Hero');

exports.getHeroes = async (req, res) => {
  const heroes = await Hero.find();
  res.json(heroes);
};

exports.getHero = async (req, res) => {
  const hero = await Hero.findOne({ slug: req.params.hero });
  if (!hero) {
    throw new Error('Invalid hero name.');
  }
  res.json(hero);
};
