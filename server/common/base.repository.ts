import { injectable } from 'inversify';
import { Model } from 'mongoose';
import 'reflect-metadata';

@injectable()
export abstract class BaseRepository {
  protected model: Model<any>

  async create(data: any) {
    const entity = new this.model(data);
    await entity.save();
    return entity;
  }

  async findAll(opts?: any) {
    return this.model.find(opts);
  }

  async findOne(opts?: any) {
    return this.model.findOne(opts);
  }

  async save(entity: any) {
    await entity.save();
    return entity;
  }
}