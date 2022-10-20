import { injectable, inject } from 'inversify';
import fs from 'node:fs/promises';
import path from 'node:path';
import 'reflect-metadata';
import { ICard } from './cards.model';

@injectable()
export class CardsService {

  private cardsDatabase: ICard[];

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    const data = await fs.readFile(path.resolve(__dirname, 'cardsDatabase.js'));
    const parseData = JSON.parse(data.toString());
    this.cardsDatabase = parseData;
  }

  findCards(cards: number[]): ICard[] {
    const result = cards.map((id) => this.cardsDatabase[id - 1]);
    return result;
  }

  generateRandomNumbers(): number[] {
    const result: number[] = [];
    do {
      const card = Math.floor(Math.random() * 151) + 1;
    if (!result.includes(card)) {
      result.push(card);
    }
    } while (result.length !== 3);
    return result;
  }

  getRandomCards(): ICard[] {
    const numbers = this.generateRandomNumbers();
    const randomCards = this.findCards(numbers);
    return randomCards;
  }
}