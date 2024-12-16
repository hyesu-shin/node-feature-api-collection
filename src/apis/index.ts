import express, {Router} from 'express';

import testRouter from '@/apis/routes/tests/test.route';

export default () => {
    const app: Router = express.Router();

    /**
     * test
     */
    testRouter({app});

    return app;
}
