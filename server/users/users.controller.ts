import { NextFunction, Request, Response } from "express";
import { IUserController } from "./users.controller.interface";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import 'reflect-metadata';
import { UsersService } from "./users.service";
import { ValidateMiddleware } from "../common/validate.middleware";
import { CreateUserDto } from "./dto/create-user.dto";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.UsersService) private usersService: UsersService) {
    super(loggerService);
    this.bindRoutes([
      {path: '/login', func: this.login, method: 'post' },
      {path: '/register', func: this.register, method: 'post' , middlewares: [new ValidateMiddleware(CreateUserDto)]},
      {path: '/all', func: this.getUsers, method: 'get' }
    ])
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const dto = req.body
    const [errors, user] = await this.usersService.loginUser(dto);
    if (errors) {
      next(new HTTPError(400, errors.toString(), 'login'));
      return;
    }
    this.ok(res, user);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const dto = req.body
    const [errors, user] = await this.usersService.createUser(dto);
    if (errors) {
      next(new HTTPError(400, errors.toString(), 'register'));
      return;
    }
    this.ok(res, user);
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    const users = await this.usersService.getAllUsers();
    this.ok(res, users);
  }
}