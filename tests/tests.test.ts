import request from 'supertest';
import { app } from '../src/index';  // Express 앱

let server: any;

beforeAll(async () => {
  const appInstance = await app();
  server = appInstance.listen(8003);
});

afterAll(() => {
  server.close();
});

describe('GET /tests', () => {
  it('should return response 200', async () => {
    const res = await request(server).get('/api/v1/tests');
    expect(res.statusCode).toBe(200);
  });
});