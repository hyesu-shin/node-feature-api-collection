const swaggerAutogen = require('swagger-autogen')();
const glob = require('glob');
const path = require('path');

const doc = {
  info: {
    title: 'node-feature-api-collection',
    description: 'node-feature-api-collection API documentation using swagger-autogen',
  },
  host: 'dev-api.inmyhands.site',
  basePath: '/api/v1',
  schemes: ['https'],
  consumes: ['application/json'],  // Request Body 타입
  produces: ['application/json'],  // Response 타입
  definitions: {
    Item: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        name: { type: 'string', example: 'Sample Item' },
        description: { type: 'string', example: 'Item description' },
        created_at: { type: 'string', format: 'date-time', example: '2025-01-01T00:00:00Z' },
        updated_at: { type: 'string', format: 'date-time', example: '2025-01-01T01:00:00Z' },
      },
      required: ['id', 'name'],
    },
  },
};

const outputFile = './swagger-output.json';

const routesDir = path.join(__dirname, '../src/apis/routes');
const endpointsFiles = glob.sync(`${routesDir}/**/*.route.ts`);

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated');
});