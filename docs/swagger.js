const swaggerAutogen = require('swagger-autogen')();
const glob = require('glob');
const path = require('path');

const doc = {
  info: {
    title: 'node-feature-api-collection',
    description: 'node-feature-api-collection API documentation using swagger-autogen',
  },
  host: 'localhost:3000',
  basePath: '/api/v1',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';

const routesDir = path.join(__dirname, '../src/apis/routes');
const endpointsFiles = glob.sync(`${routesDir}/**/*.route.ts`);

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated');
});