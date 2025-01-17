import express, {Router} from 'express';

import TestsController from '@/features/tests/tests.controller';

const router: Router = express.Router();
const testsController = new TestsController();

export default ({ app } : { app: Router }) => {
    app.use('/api/v1', router);

    router.get(
      '/tests', 
      testsController.getTest()
    );

    router.post(
      '/tests', 
      testsController.getTest()
    );
    
    // router.get('/redisGet', TestController.getRedisTest)
};
