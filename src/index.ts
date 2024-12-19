import express, {Express} from 'express';

import config from '@/controllers/config';
import indexLoader from '@/loaders';

const port = config.port;

async function app(): Promise<Express> {
  const app: Express = express();
  await indexLoader({ expressApp: app });
  return app;
}

async function startServer() {
    const app: Express = express();

    await indexLoader({ expressApp: app });

    app.listen(port, () => {
        console.log(`
    #############################################
        🛡️ Server listening on port: ${port} 🛡️
    #############################################    
    `);
    }).on('error', err => {
        console.log(err);
        process.exit(1);
    });
}

startServer()
    .then()
    .catch(err => {
        console.log(err);
    });

export { app }