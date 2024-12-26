import {Service} from 'typedi';

import IndexService from '@/services/index'

@Service()
class ItemsService extends IndexService {
    constructor() {
        super();
    }

    async getItems(data: any) {
      console.log(data);
      return {
        code: 'ok'
      }
    }

}

export default ItemsService;
