import express, {Router} from 'express';

import TestsController from '@/features/tests/tests.controller';

const router: Router = express.Router();

export default ({ app } : { app: Router }) => {
    app.use('/api/v1', router);

    router.get('/tests', TestsController.getTest);
    // router.post('/message', TestsController.getTest);
    // router.get('/redisGet', TestController.getRedisTest)
};
