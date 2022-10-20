import { NextFunction, Request, Response } from "express";
import { IDeckController } from "./deck.controller.interface";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import 'reflect-metadata';
import { DeckService } from "./deck.service";

@injectable()
export class DeckController extends BaseController implements IDeckController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.DeckService) private deckService: DeckService) {
    super(loggerService);
    this.bindRoutes([
      {path: '/random', func: this.getRandomDeck, method: 'get' },
      {path: '/:userId', func: this.updateDeck, method: 'put' },
      {path: '/:userId', func: this.getDeck, method: 'get' },
    ])
  }

  async updateDeck(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const deckToUpdate: number[] = req.body.deckToUpdate;
    const [errors, deck] = await this.deckService.updateDeckByUserId(userId, deckToUpdate);
    if (errors) {
      return next(new HTTPError(400, errors.toString(), 'updateDeck'));
    }
    this.ok(res, deck);
  }

  async getDeck(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const [errors, deckCards] = await this.deckService.getDeckByUserId(userId);
    if (errors) {
      return next(new HTTPError(400, errors, 'getDeck'))
    }
    this.ok(res, deckCards);
  }

  async getRandomDeck(req: Request, res: Response, next: NextFunction) {
    const randomDeckCards = await this.deckService.getRandomDeckCards();
    this.ok(res, randomDeckCards);
  }
}