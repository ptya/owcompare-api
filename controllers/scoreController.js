const Hero = require('../models/Hero');
const Score = require('../models/Score');

exports.getScores = async (req, res) => {
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
};
