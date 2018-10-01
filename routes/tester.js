const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const resp = { msg: 'success' };
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
