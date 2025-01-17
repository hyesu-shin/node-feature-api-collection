import {Container, Service} from 'typedi';

import IndexController from '@/controllers';
import UsersService from '@/features/users/users.service';

const usersService: UsersService = Container.get(UsersService);

@Service()
class UsersController extends IndexController {
    constructor() {
      super();
    }

    getUserById() {
      return this.runController(async (req) => {
        const params = this.parseParam(req);
        return await usersService.getUserById(params);
      });
    };

    loginUser() {
      return this.runController(async (req) => {
        const params = req.body;
        return await usersService.loginUser(params);
      });
    }

    logoutUser() {
      return this.runController(async (req) => {
        const params = req.body;
        return await usersService.logoutUser(params);
      });
    }

    refreshUser() {
      return this.runController(async (req) => {
        const params = req.body;
        return await usersService.refreshUser(params);
      });
    }
}

export default UsersController;