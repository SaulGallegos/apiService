const { Router } = require('express');
const { check } = require('express-validator');

const checkValidation = require('../middlewares/validations.js');
const { register, login } = require('../controllers/user.js');

const router = Router();

router.post(
  '/register',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    checkValidation,
  ],
  register
);

router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    checkValidation,
  ],
  login
);

module.exports = router;
