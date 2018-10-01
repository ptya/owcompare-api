const express = require('express');

const router = express.Router();
const tester = require('./tester');

router.use('/tester', tester);

module.exports = router;
