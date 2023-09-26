const { response } = require('express');
const { validationResult } = require('express-validator');

const checkValidations = (req, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      message: 'Error en datos de petición',
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = checkValidations;
