import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { CreateDeckDto } from './dto/create-deck.dto';
import { IDeckRepository } from './deck.repo.interface';
import { IDeckModel } from './deck.model';
import { CardsService } from '../cards/cards.service';
import { ICard } from '../cards/cards.model';
import { CollectionService } from '../collection/coll.service';
import tryUpdateDeck from './deck.validate';

@injectable()
export class DeckService {

    constructor (
      @inject(TYPES.IDeckRepository) private deckRepository: IDeckRepository,
      @inject(TYPES.CardsService) private cardsService: CardsService,
      @inject(TYPES.CollectionService) private collectionService: CollectionService
    ) { }

    async createDeck(dto: CreateDeckDto) {
      const { userId, cards } = dto;
      const collection = await this.deckRepository.create({ userId, cards });
      return collection;
    }

    async updateDeckByUserId(userId: string, deckToUpdate: number[]) {
      const collection = await this.collectionService.getRawCollectionByUserId(userId);
      const deck: IDeckModel = await this.deckRepository.findOne({ userId });
      const errors = tryUpdateDeck(collection, deck, deckToUpdate);
      if (errors) {
        return [errors];
      }
      await this.deckRepository.save(deck);
      return [null, deck];
    }

    async getDeckByUserId(userId: string): Promise<[null, ICard[]] | [string]> {
      try {
        const deck: IDeckModel = await this.deckRepository.findOne({ userId });
        const cardsToSend = await this.cardsService.findCards(deck.cards);
        return  [null , cardsToSend]; 
      } catch (error) {
        return ['такого пользователя нет'];
      }
    }

    async getRandomDeckCards(): Promise<ICard[]> {
      const cardsToSend = await this.cardsService.getRandomCards();
      return cardsToSend; 
    }
}