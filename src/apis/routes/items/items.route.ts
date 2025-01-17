import express, {Router} from 'express';

import ItemsController from '@/features/items/items.controller';
import {
  validateGetItems, 
  validateGetItemById, 
  validateAddItems,
  validateModifyItems,
  validateDeleteItems,
} from '@/features/items/items.validation';

const router: Router = express.Router();
const itemsController = new ItemsController();

export default ({ app } : { app: Router }) => {
  app.use('/api/v1', router);

  router.get(
    '/items', 
    validateGetItems,
    itemsController.getItems(),
  );

  router.get(
    '/items/:id',
    validateGetItemById,
    itemsController.getItemById(),
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
