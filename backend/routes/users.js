const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserMe,
} = require('../controllers/users');

router.get('/users/me', getUserMe);

module.exports = router;