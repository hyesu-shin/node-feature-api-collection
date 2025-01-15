import express, {Router} from 'express';

import ItemsController from '@/features/items/items.controller';
import {
  validateGetItems, 
  validateGetItemById, 
  validateAddItems,
  validateModifyItems,
  validateDeleteItems,
} from '@/middlewares/validations/items.validation';

const router: Router = express.Router();
const itemsController = new ItemsController();

export default ({ app } : { app: Router }) => {
  app.use('/api/v1', router);

  // #swagger.description = 'dd'
  router.get(
    '/items', 
    validateGetItems,
    (req, res, next) => {
      return itemsController.getItems()(req, res, next);
    }
  );

  router.get(
    '/items/:id',
    validateGetItemById,
    itemsController.getItemsById(),
  );

  router.post(
    '/items', 
    validateAddItems,
    itemsController.addItems(),
  );

  router.put(
    '/items/:id',
    validateModifyItems,
    itemsController.modifyItems(),
  );

  router.delete(
    '/items/:id',
    validateDeleteItems,
    itemsController.deleteItems(),
  );
};
