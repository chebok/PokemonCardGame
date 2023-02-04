import express, { Express } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server } from 'http';
import swaggerUi from 'swagger-ui-express';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { IUserController } from './users/users.controller.interface';
import { ICollectionController } from './collection/coll.controller.interface';
import { IDeckController } from './deck/deck.controller.interface';
import { IConfigService } from './config/config.service.interface';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IUserController) private userController: IUserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
    @inject(TYPES.ICollectionController) private collectionController: ICollectionController,
    @inject(TYPES.IDeckController) private deckController: IDeckController,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    ) {
		this.app = express();
    this.port = Number(this.configService.get('PORT')) || 8000;
	}

  useMiddlewares() {
    this.app.use(cors({ origin: process.env.ORIGIN || 'http://localhost:3000',
    credentials: true }))
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));
  }

	useRoutes() {
		this.app.use('/users', this.userController.router);
    this.app.use('/collection', this.collectionController.router);
    this.app.use('/deck', this.deckController.router);
	}

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

	public async init() {
    this.port = Number(process.env.PORT) || 5000;
    this.useMiddlewares()
		this.useRoutes();
    this.useExeptionFilters();
    try {
      await mongoose.connect('mongodb+srv://Chebok:202Seldon@cluster0.h58165t.mongodb.net/mongo-node-app');
    } catch (e) {
      console.log(e);
    }
		this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
		this.logger.log(`Swagger доступен на http://localhost:${this.port}/api-docs/#`);
	}
}