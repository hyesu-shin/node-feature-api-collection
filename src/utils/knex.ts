import {knex} from 'knex';

import config from '@/controllers/config';

type knexConfigType = {
    [anyKeyword: string]: any;
};

type knexType = {
    [anyKeyword: string]: any;
}

const knexClient: knexType = {};

const knexConfig: knexConfigType = {
    mysqlV1: {
        client: 'mysql2',
        connection: {
            dateStrings: 'date',
            host: config.mysqlV1.host,
            user: config.mysqlV1.user,
            password: config.mysqlV1.password,
            database: config.mysqlV1.name,
        },
        pool: {
            min: 0,
            max: 10
        },
    }
}

const setKnexConfig = (client: any) => {
    const { name } = client;

    if (!knexClient[name]) {
        knexClient[name] = knex(knexConfig[name]);
    }

    return knexClient[name];
}

export default setKnexConfig;
