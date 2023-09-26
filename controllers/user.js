const { User } = require('../db/user.js');
const bcryptjs = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt.js');

async function register(req, res) {
  const { email, password } = req.body;

  const salt = bcryptjs.genSaltSync();
  const hash = bcryptjs.hashSync(password, salt);
  const user = new User({ email, password: hash });

  return res.json({
    ok: true,
    user,
    token: await generateJwt(user._id),
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      ok: false,
      msg: 'Email no encontrado',
    });
  }

  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      ok: false,
      msg: 'Contraseña no valida',
    });
  }

  return res.json({
    ok: true,
    user,
    token: await generateJwt(user._id),
  });
}

module.exports = { register, login };
