import knex from '@/utils/knex';

type dataObject = {
    [anyKeyword: string]: any;
};

export default class IndexService {
    constructor() {
    }

    async runQueryBuilder(client: string, cb: Function) {
        const conn = await knex({name: client});
        try {
            return await cb(conn);
        } catch (err) {
            return err;
        }
    }

}
