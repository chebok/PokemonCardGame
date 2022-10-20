import { injectable } from 'inversify';
import { IRolesRepository } from "./roles.repo.interface";
import { Role, IRoleModel } from "./roles.model";
import 'reflect-metadata';
import { BaseRepository } from '../common/base.repository';
import { Model } from 'mongoose';

@injectable()
export class RolesRepository extends BaseRepository implements IRolesRepository {
  protected model: Model<IRoleModel> = Role;
}