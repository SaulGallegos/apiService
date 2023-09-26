const jwt = require('jsonwebtoken');

const { User } = require('../db/user.js');

function generateJwt(id) {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.MY_SECRET_JWT_SEED,
      {
        expiresIn: '7d',
      },
      (err, token) => {
        if (err) {
          reject('Error al generar token de autenticación');
        }

        resolve(token);
      }
    );
  });
}

async function validateJwt(req, res = response, next) {
  const token = req.header('session');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No autorizado',
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.MY_SECRET_JWT_SEED);
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: 'No autorizado',
      });
    }

    req.id = id;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido',
    });
  }
}

module.exports = { generateJwt, validateJwt };
