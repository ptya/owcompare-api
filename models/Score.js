const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

scoreSchema.virtual('heroes').get(function() {
  return this.secondaryHero.map(hero => hero.slug);
});

function autopopulate(next) {
  // this.populate({ path: 'primaryHero', select: 'slug -_id' });
  this.populate({ path: 'secondaryHero', select: 'slug -_id' });
  // this.populate('heroes', 'slug -_id');
  next();
}

scoreSchema.pre('find', autopopulate);
scoreSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Score', scoreSchema, 'scores');
