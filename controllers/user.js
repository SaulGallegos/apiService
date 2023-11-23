const User = require('../db/user.js');
const bcryptjs = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt.js');

const posibleImages = [
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/371985/pexels-photo-371985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

async function register(req, res) {
  const { username, password } = req.body;

  const userExists = User.findOne({ username });
  if (userExists) {
    return res.status(400).json({
      ok: false,
      msg: 'El usuario ya existe',
    });
  }
  const salt = bcryptjs.genSaltSync();
  const hash = bcryptjs.hashSync(password, salt);
  const user = new User({
    username,
    password: hash,
    img: posibleImages[Math.floor(Math.random() * posibleImages.length)],
  });

  await user.save();

  return res.json({
    ok: true,
    user,
    token: await generateJwt(user._id),
  });
}

async function login(req, res) {
  const { username, password } = req.body;

  const user = await User.findOne(
    { username },
    { username: true, password: true, img: true }
  );

  if (!user) {
    return res.status(400).json({
      ok: false,
      msg: 'Usuario no encontrado',
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

async function getUsers(req, res) {
  const users = await User.find();

  return res.json({
    ok: true,
    users,
  });
}

module.exports = { register, login, getUsers };
