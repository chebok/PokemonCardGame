import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { CollectionController } from './collection/coll.controller';
import { ICollectionController } from './collection/coll.controller.interface';
import { CollectionRepository } from './collection/coll.repo';
import { ICollectionRepository } from './collection/coll.repo.interface';
import { DeckController } from './deck/deck.controller';
import { IDeckController } from './deck/deck.controller.interface';
import { CollectionService } from './collection/coll.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { RolesRepository } from './roles/roles.repo';
import { IRolesRepository } from './roles/roles.repo.interface';
import { RolesService } from './roles/roles.service';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { IUserController } from './users/users.controller.interface';
import { UsersRepository } from './users/users.repo';
import { UsersService } from './users/users.service';
import { DeckRepository } from './deck/deck.repo';
import { DeckService } from './deck/deck.service';
import { IDeckRepository } from './deck/deck.repo.interface';
import { CardsService } from './cards/cards.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<IUserController>(TYPES.IUserController).to(UserController);
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
  bind<App>(TYPES.Application).to(App);
  bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository);
  bind<UsersService>(TYPES.UsersService).to(UsersService);
  bind<IRolesRepository>(TYPES.IRolesRepository).to(RolesRepository);
  bind<RolesService>(TYPES.RolesService).to(RolesService);
  bind<ICollectionController>(TYPES.ICollectionController).to(CollectionController);
  bind<ICollectionRepository>(TYPES.ICollectionRepository).to(CollectionRepository);
  bind<CollectionService>(TYPES.CollectionService).to(CollectionService);
  bind<IDeckController>(TYPES.IDeckController).to(DeckController);
  bind<IDeckRepository>(TYPES.IDeckRepository).to(DeckRepository);
  bind<DeckService>(TYPES.DeckService).to(DeckService);
  bind<CardsService>(TYPES.CardsService).to(CardsService)
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application)
  app.init();
  return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
