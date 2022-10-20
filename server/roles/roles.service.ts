import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IRolesRepository } from './roles.repo.interface';
import { IRoleModel } from './roles.model';

@injectable()
export class RolesService {

    constructor (@inject(TYPES.IRolesRepository) private rolesRepository: IRolesRepository) { }

    async getByValue(value: string): Promise<IRoleModel> {
        const role = await this.rolesRepository.findOne({where: { value }});
        return role;
    }
}