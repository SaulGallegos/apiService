const { Router } = require('express');
const { check } = require('express-validator');

const checkValidation = require('../middlewares/validations.js');
const { register, login, getUsers } = require('../controllers/user.js');

const router = Router();

router.post(
  '/register',
  [
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    checkValidation,
  ],
  register
);

router.post(
  '/login',
  [
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    checkValidation,
  ],
  login
);

router.get('/', getUsers);

module.exports = router;
