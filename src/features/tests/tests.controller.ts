import { Container, Service } from 'typedi';
import IndexController from '@/controllers';
import TestsService from '@/features/tests/tests.service';

const testsService: TestsService = Container.get(TestsService);

@Service()
class TestsController extends IndexController {
  constructor() {
    super();
  }

  /**
   * @description Returns a simple "OK" response.
   */
  getTest() {
    return this.runController(async (req) => {
      return {
        success: true,
      }
    });
  }

  /**
   * @description Executes a Redis-related test and returns the result.
   */
  getRedisTest() {
    return this.runController(async (req) => {
      const result = await testsService.goTest();
      return {
        success: true,
      }
    });
  }

  /**
   * @description Handles a webhook post request and returns the received body.
   */
  postWebHook() {
    return this.runController(async (req) => {
      console.log('Received Webhook:', req.body);
      return {
        success: true,
      }
    });
  }
}

export default TestsController;
