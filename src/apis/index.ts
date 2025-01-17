import express, {Router} from 'express';

import testsRouter from '@/apis/routes/tests/tests.route';
import itemsRouter from '@/apis/routes/items/items.route';
import usersRouter from '@/apis/routes/users/users.route';

export default () => {
    const app: Router = express.Router();

    /**
     * tests
     */
    testsRouter({app});

    /**
     * items
     */
    itemsRouter({app});

    /**
     * users
     */
    usersRouter({app});

    return app;
}
