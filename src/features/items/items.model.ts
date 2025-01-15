import {OperationType, QueryParams, SelectParams, InsertParams, UpdateParams, DeleteParams} from '@/types/common/models';
import {Item} from '@/features/items/items.type';

import { Service } from 'typedi';
import IndexModel from '@/models/index';

@Service()
export default class ItemsModel extends IndexModel {
  constructor() {
    super();
  }

  selectItems(params: SelectParams) {
    return this.runQuery('mysql', null,'items', OperationType.SELECT, params);
  }

  insertItems(params: InsertParams) {
    return this.runQuery('mysql', null, 'items', OperationType.INSERT, params);
  }

  updateItems(params: UpdateParams) {
    return this.runQuery('mysql', null, 'items', OperationType.UPDATE, params);
  }

  deleteItems(params: DeleteParams) {
    return this.runQuery('mysql', null, 'items', OperationType.DELETE, params);
  }
};