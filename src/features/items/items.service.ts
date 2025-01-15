import {SelectParams, InsertParams, UpdateParams, DeleteParams} from '@/types/common/models';

import {Service} from 'typedi';

import IndexService from '@/services/index';
import ItemsModel from '@/features/items/items.model';

@Service()
class ItemsService extends IndexService {
    constructor(private readonly itemsModel: ItemsModel) {
      super();
    }

    async getItems(params: SelectParams) {
      const result = await this.itemsModel.selectItems(params);
      return this.sendToResult(result, true);
    }

    async getItemsById(params: SelectParams) {
      const result = await this.itemsModel.selectItems(params);
      return this.sendToResult(result, true);
    }

    async addItems(params: InsertParams) {
      const result = await this.itemsModel.insertItems(params);
      return this.sendToResult(result, false, 'insert');
    }

    async modifyItems(params: UpdateParams) {
      const result = await this.itemsModel.updateItems(params);
      return this.sendToResult(result, false, 'update');
    }

    async deleteItems(params: DeleteParams) {
      const result = await this.itemsModel.deleteItems(params);
      return this.sendToResult(result, false, 'delete');
    }
}

export default ItemsService;
