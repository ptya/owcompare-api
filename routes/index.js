const express = require('express');

const router = express.Router();
const tester = require('./tester');
const heroes = require('./heroes');
const hero = require('./hero');
const scores = require('./scores');

router.use('/tester', tester);
router.use('/heroes', heroes);
router.use('/hero', hero);
router.use('/scores', scores);

module.exports = router;
