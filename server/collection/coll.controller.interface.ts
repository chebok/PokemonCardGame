import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/base.controller";

export interface ICollectionController extends BaseController {
  getCollection: (req: Request, res: Response, next: NextFunction) => void;
  updateCollection: (req: Request, res: Response, next: NextFunction) => void;
}