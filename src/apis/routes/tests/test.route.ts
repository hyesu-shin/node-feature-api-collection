import express, {Router} from 'express';

import TestController from '@/controllers/tests/test.controller';

const router: Router = express.Router();

export default ({ app } : { app: Router }) => {
    app.use('/test', router);
    // router.get('/', TestController.getTest);
    // router.post('/message', TestController.sendMessage);
    // router.get('/redisGet', TestController.getRedisTest)
};
