const mongoose = require('mongoose');
const slug = require('slugs');

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a hero name!',
  },
  slug: {
    type: String,
    unique: true,
  },
  class: {
    type: String,
    trim: true,
  },
  avatarImg: String,
  mainImg: String,
});

// Define our indexes
heroSchema.index({
  slug: 'text',
  class: 'text',
});

heroSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // find other stores that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const heroesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (heroesWithSlug.length) {
    this.slug = `${this.slug}-${heroesWithSlug.length + 1}`;
  }
  next();
});

module.exports = mongoose.model('Hero', heroSchema, 'heroes');
