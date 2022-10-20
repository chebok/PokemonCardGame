import { BaseRepository } from "../common/base.repository";

export interface IRolesRepository extends BaseRepository {
  findOne: (opts?: any) => any
};