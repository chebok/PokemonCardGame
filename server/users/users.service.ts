import { injectable, inject } from 'inversify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'reflect-metadata';
import { TYPES } from '../types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IUsersRepository } from './users.repo.interface';
import { IUserModel } from "./users.model";
import { RolesService } from '../roles/roles.service';
import { DeckService } from '../deck/deck.service';
import { CollectionService } from '../collection/coll.service';
import { CardsService } from '../cards/cards.service';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UsersService {

    constructor (
      @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
      @inject(TYPES.RolesService) private rolesService: RolesService,
      @inject(TYPES.DeckService) private deckService: DeckService,
      @inject(TYPES.CollectionService) private collectiionService: CollectionService,
      @inject(TYPES.CardsService) private cardsService: CardsService,
      @inject(TYPES.ConfigService) private configService: IConfigService,
    ) { }

    async createUser(dto: CreateUserDto): Promise<[null, LoginUserDto] | [string]> {
      try {
        const { username, password } = dto;
        const candidate = await this.usersRepository.findOne({ username });
        if (candidate) {
          return ['Такой пользователь уже существует'];
        }
        const salt = this.configService.get('SALT') || 8;
        const hashPassword = bcrypt.hashSync(password, Number(salt));
        const { value } = await this.rolesService.getByValue('USER');
        const user: IUserModel = await this.usersRepository.create({ username, password: hashPassword, roles: [value] });
        const cards = await this.cardsService.generateRandomNumbers();
        await this.collectiionService.createCollection({userId: user._id, cards});
        await this.deckService.createDeck({userId: user._id, cards});
        const token = this.generateAccessToken(user._id, user.roles)
        const loginUser = {
          id: user._id,
          username: user.username,
          roles: user.roles,
          accessToken: token
        }
        return [null, loginUser];
      } catch (error) {
        return ['Что-то пошло не так, попробуйте еще раз'];
      }
    }

    async loginUser(dto: CreateUserDto): Promise<[null, LoginUserDto] | [string]> {
      try {
        const { username, password } = dto;
        const user = await this.usersRepository.findOne({ username });
        if (!user) {
          return [`Пользователь ${username} не найден`];
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
          return ['Введен неверный пароль'];
        }
        const token = this.generateAccessToken(user._id, user.roles)
        const loginUser = {
          id: user._id,
          username: user.username,
          roles: user.roles,
          accessToken: token
        }
        return [null, loginUser];
      } catch (error) {
        return ['Что-то пошло не так, попробуйте еще раз'];
      }
    }

    async getAllUsers() {
        const users = await this.usersRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByName(name: string) {
        const user = await this.usersRepository.findOne({where: {name}, include: {all: true}});
        return user;
    }

    generateAccessToken(userId: string, roles: string[]) {
      const payload = {
        id: userId,
        roles,
      };
      const secretKey: string = process.env.SECRET ?? 'secret'
      return jwt.sign(payload, secretKey, { expiresIn: '24h' });
    }
}