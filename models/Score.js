const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  primaryHero: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hero',
    required: 'You must supply a primary hero!',
  },
  secondaryHero: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Hero',
    },
  ],
  score: {
    type: Number,
    min: -20,
    max: 20,
  },
});

module.exports = mongoose.model('Score', scoreSchema, 'scores');
