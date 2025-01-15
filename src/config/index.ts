import dotenv from 'dotenv';

dotenv.config()

export default {
    environment: process.env.ENVIRONMENT || 'DEVELOPMENT',
    port: process.env.PORT || '8002',
    mysql: {
        host: process.env.MYSQL_DB_HOST || '',
        name: process.env.MYSQL_DB_NAME || 'mysql_db_name',
        user: process.env.MYSQL_USER_NAME || 'mysql_user_name',
        password: process.env.MYSQL_PASSWORD || '',
    },
};
