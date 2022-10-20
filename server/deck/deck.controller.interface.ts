import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/base.controller";

export interface IDeckController extends BaseController {
  getDeck: (req: Request, res: Response, next: NextFunction) => void;
  updateDeck: (req: Request, res: Response, next: NextFunction) => void;
  getRandomDeck: (req: Request, res: Response, next: NextFunction) => void;
}