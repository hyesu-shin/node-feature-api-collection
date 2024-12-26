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
    mysql: {
        client: 'mysql2',
        connection: {
            dateStrings: 'date',
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.name,
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
