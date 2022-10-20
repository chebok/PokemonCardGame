import { injectable } from 'inversify';
import { IDeckRepository } from "./deck.repo.interface";
import { Deck, IDeckModel } from "./deck.model";
import 'reflect-metadata';
import { BaseRepository } from '../common/base.repository';
import { Model } from 'mongoose';

@injectable()
export class DeckRepository extends BaseRepository implements IDeckRepository {
  protected model: Model<IDeckModel> = Deck;
}