import {Service} from 'typedi';

import IndexService from '@/services/index'

@Service()
class TestsService extends IndexService {
    constructor() {
        super();
    }

    async goTest() {
        for (let i = 0; i < 10; i++) {
            console.log(i);
        }
        return {code: 'ok', result: 1};
    }

}

export default TestsService;
