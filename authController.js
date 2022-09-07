const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('./config');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret, {expiresIn: '24h'});
}

class AuthController {

  async createUser(req, res) {
    try {
      res.render('create', {
        title: 'Registration',
        
      });
    } catch (error) {
        
    }
  }

  async loginUser(req, res) {
    try {
      res.render('login', {
        title: 'Login',
      });
    } catch (error) {
        
    }
  }

  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Ошибка при регистрации', errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({username});
      if (candidate) {
        return res.status(400).json({message: 'Такой пользователь уже существует'});
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value: "USER"});
      const user = new User({ username, password: hashPassword, roles: [userRole.value] });
      await user.save();
      return res.json({message: 'Пользователь успешно зарегистрирован'});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Registration error'});
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен неверный пароль' });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({token});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Login error'});
    }
  }

  async getUsers(req, res) {
    try {
      // const userRole = new Role();
      // const adminRole = new Role({value: "ADMIN"});
      // await userRole.save();
      // await adminRole.save();
      const users = await User.find({}).lean();
      res.render('users', {
        mainTitle: 'Users list',
        isIndex: true,
        users,
      });
    } catch (error) {
        
    }
  }
}

module.exports = new AuthController();