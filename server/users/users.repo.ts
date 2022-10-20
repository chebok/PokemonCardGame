import { injectable } from 'inversify';
import { IUsersRepository } from "./users.repo.interface";
import { User, IUserModel } from "./users.model";
import 'reflect-metadata';
import { BaseRepository } from '../common/base.repository';
import { Model } from 'mongoose';

@injectable()
export class UsersRepository extends BaseRepository implements IUsersRepository {
  protected model: Model<IUserModel> = User;
}