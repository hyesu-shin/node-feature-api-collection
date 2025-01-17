import {Container, Service} from 'typedi';

import IndexController from '@/controllers';
import ItemsService from '@/features/items/items.service';

const itemsService: ItemsService = Container.get(ItemsService);

@Service()
class ItemsController extends IndexController {
    constructor() {
      super();
    }

    getItems() {
      return this.runController(async (req) => {
        const params = this.parseQuery(req);
        return await itemsService.getItems(params);
      });
    }
  
    getItemById() {
      return this.runController(async (req) => {
        const params = this.parseParam(req);
        return await itemsService.getItemById(params);
      });
    };
  
    addItems() {
      return this.runController(async (req) => {
        const params = this.parseBody(req);
        return await itemsService.addItems(params);
      });
    };
  
    modifyItems() {
      return this.runController(async (req) => {
        const params = this.parseParamAndBody(req);
        return await itemsService.modifyItems(params);
      });
    }
    
    deleteItems() {
      return this.runController(async (req) => {
        const params = this.parseParam(req)
        return await itemsService.deleteItems(params);
      });
    }
}

export default ItemsController;