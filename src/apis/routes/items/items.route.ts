import express, {Router} from 'express';

import ItemsController from '@/features/items/items.controller';

const router: Router = express.Router();

export default ({ app } : { app: Router }) => {
    app.use('/api/v1', router);

    router.get('/items', ItemsController.getItems);
    router.get('/items/:id', ItemsController.getItems);
    router.post('/items', ItemsController.getItems);
    router.put('/items/:id', ItemsController.getItems);
    router.delete('/items/:id', ItemsController.getItems);
};
