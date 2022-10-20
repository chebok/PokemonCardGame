import { injectable } from 'inversify';
import { ICollectionRepository } from "./coll.repo.interface";
import { Collection, ICollectionModel } from "./coll.model";
import 'reflect-metadata';
import { BaseRepository } from '../common/base.repository';
import { Model } from 'mongoose';

@injectable()
export class CollectionRepository extends BaseRepository implements ICollectionRepository {
  protected model: Model<ICollectionModel> = Collection;
}