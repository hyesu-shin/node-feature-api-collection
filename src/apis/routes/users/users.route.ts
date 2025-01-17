import express, {Router} from 'express';

import UsersController from '@/features/users/users.controller';
import {
  validateGetUserById, 
  validateUserLogin,
  validateUserLogout,
  validateUserRefresh,
} from '@/features/users/users.validation';

const router: Router = express.Router();
const usersController = new UsersController();

export default ({ app } : { app: Router }) => {
  app.use('/api/v1', router);

  router.get(
    '/users/:id',
    validateGetUserById,
    usersController.getUserById(),
  );

  router.post(
    '/users/login',
    validateUserLogin,
    usersController.loginUser(),
  );

  router.post(
    '/users/logout',
    validateUserLogout,
    usersController.logoutUser(),
  );

  router.post(
    '/users/refresh',
    validateUserRefresh,
    usersController.refreshUser(),
  );
};
