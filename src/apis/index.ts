import express, {Router} from 'express';

import testsRouter from '@/apis/routes/tests/tests.route';

export default () => {
    const app: Router = express.Router();

    /**
     * test
     */
    testsRouter({app});

    return app;
}
