import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Role from '../models/Role.js';
import User from '../models/User.js';
import Collection from '../models/Collection.js';
import Deck from '../models/Deck.js';
import generateRandomCards from './generateRandomCards.js';

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
};

class AuthController {
  async register(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при регистрации', errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({ username, password: hashPassword, roles: [userRole.value] });
      await user.save();
      const cards = generateRandomCards();
      const collection = new Collection({ userId: user._id, cards });
      await collection.save();
      const deck = new Deck({ userId: user._id, cards });
      await deck.save();
      console.log(user);
      const token = generateAccessToken(user._id, user.roles);
      const authorities = [];

      user.roles.forEach((role) => {
        authorities.push(role.toUpperCase());
      });
      console.log(res);
      return res.status(200).json({
        id: user._id,
        username: user.username,
        roles: authorities,
        accessToken: token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен неверный пароль' });
      }
      const token = generateAccessToken(user._id, user.roles);
      const authorities = [];

      user.roles.forEach((role) => {
        authorities.push(role.toUpperCase());
      });

      return res.status(200).json({
        id: user._id,
        username: user.username,
        roles: authorities,
        accessToken: token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      // const userRole = new Role();
      // const adminRole = new Role({value: 'ADMIN'});
      // await userRole.save();
      // await adminRole.save();
      const users = await User.find({}).lean();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
