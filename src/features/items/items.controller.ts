import {Container} from 'typedi';
import {Request, Response, NextFunction, RequestHandler} from 'express';

import ItemsService from '@/features/items/items.service';

const items: ItemsService = Container.get(ItemsService);

const getItems: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
        result: 'ok',
    });
  } catch (err) {
      next(err);
  }
}

export default {
  getItems,
};
