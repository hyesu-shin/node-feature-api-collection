import dotenv from 'dotenv';

dotenv.config()

export default {
    environment: process.env.ENVIRONMENT || 'DEVELOPMENT',
    port: process.env.PORT || '8002',
    mysqlV1: {
        host: process.env.DB_HOST || '',
        name: process.env.DB_NAME || 'db_name',
        user: process.env.USER_NAME || 'user_name',
        password: process.env.PASSWORD || '',
    },
};
