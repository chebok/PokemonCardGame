import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { ICollectionRepository } from './coll.repo.interface';
import { ICollectionModel } from './coll.model';
import tryAddToCollection from './coll.validate';
import { CardsService } from '../cards/cards.service';

@injectable()
export class CollectionService {

    constructor (
      @inject(TYPES.ICollectionRepository) private collectionRepository: ICollectionRepository,
      @inject(TYPES.CardsService) private cardsService: CardsService,
    ) { }

    async createCollection(dto: CreateCollectionDto) {
      const { userId, cards } = dto;
      const collection = await this.collectionRepository.create({ userId, cards });
      return collection;
    }

    async updateCollectionByUserId(userId: string, cardsToAdd: number[]) {
      const collection: ICollectionModel = await this.collectionRepository.findOne({ userId });
      const errors = tryAddToCollection(collection, cardsToAdd);
      if (errors) {
        return [errors];
      }
      await this.collectionRepository.save(collection);
      return [null, collection];
    }

    async getCollectionByUserId(userId: string) {
      try {
        const collection: ICollectionModel = await this.collectionRepository.findOne({ userId });
        const cardsToSend = await this.cardsService.findCards(collection.cards);
        return  [null, cardsToSend]; 
      } catch (error) {
        return ['такой коллекции не найдено'];
      }
    }

    async getRawCollectionByUserId(userId: string) {
      const collection: ICollectionModel = await this.collectionRepository.findOne({ userId });
      return collection; 
    }
}