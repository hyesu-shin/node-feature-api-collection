import {OperationType, QueryParams, SelectParams, InsertParams, UpdateParams, DeleteParams} from '@/types/common/models';
import {Item} from '@/features/items/items.type';

import { Service } from 'typedi';
import IndexModel from '@/models/index';

@Service()
export default class UsersModel extends IndexModel {
  constructor() {
    super();
  }

  selectUsers(params: SelectParams) {
    return this.runQuery('mysql', null, 'users', OperationType.SELECT, params);
  }

  insertUsers(params: InsertParams) {
    return this.runQuery('mysql', null, 'users', OperationType.INSERT, params);
  }

  updateUsers(params: UpdateParams) {
    return this.runQuery('mysql', null, 'users', OperationType.UPDATE, params);
  }

  deleteUsers(params: DeleteParams) {
    return this.runQuery('mysql', null, 'users', OperationType.DELETE, params);
  }

  selectRefreshToken(params: SelectParams) {
    return this.runQuery('mysql', null, 'refreshToken', OperationType.SELECT, params);
  }

  insertRefreshToken(params: InsertParams) {
    return this.runQuery('mysql', null, 'refreshToken', OperationType.INSERT, params);
  }

  updateRefreshToken(params: UpdateParams) {
    return this.runQuery('mysql', null, 'refreshToken', OperationType.UPDATE, params);
  }
};