const express = require('express');

const router = express.Router();
const tester = require('./tester');
const heroes = require('./heroes');
const hero = require('./hero');
const scores = require('./scores');

router.use('/tester', tester);
router.use('/api/heroes', heroes);
router.use('/api/hero', hero);
router.use('/api/scores', scores);

module.exports = router;
