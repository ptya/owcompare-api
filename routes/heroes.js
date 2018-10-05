const express = require('express');
const heroController = require('../controllers/heroController');
const { catchErrors } = require('../middlewares/error');

const router = express.Router();

router.get('/', catchErrors(heroController.getHeroes));

module.exports = router;
