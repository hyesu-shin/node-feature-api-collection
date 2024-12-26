import {Container} from 'typedi';
import {Request, Response, NextFunction, RequestHandler} from 'express';

import ItemsService from '@/features/items/items.service';

const itemsService: ItemsService = Container.get(ItemsService);

const getItems: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await itemsService.getItems(req);
    if (result.code !== 'ok') {
      return next(result);
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

const getItemsById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await itemsService.getItems(req);
    if (result.code !== 'ok') {
      return next(result);
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

const addItems: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await itemsService.getItems(req);
    if (result.code !== 'ok') {
      return next(result);
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

const modifyItems: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await itemsService.getItems(req);
    if (result.code !== 'ok') {
      return next(result);
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

const deleteItems: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await itemsService.getItems(req);
    if (result.code !== 'ok') {
      return next(result);
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}



export default {
  getItems,
  getItemsById,
  addItems,
  modifyItems,
  deleteItems,
};
