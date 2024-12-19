import {Container} from 'typedi';
import {Request, Response, NextFunction, RequestHandler} from 'express';

import TestsService from '@/features/tests/tests.service';

const test: TestsService = Container.get(TestsService);

const getTest: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
        result: 'ok',
    });
  } catch (err) {
      next(err);
  }
}

const getRedisTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await test.goTest();
        return res.status(200).json(result);
    } catch (err: any) {
        return next(err);
    }
}

const postWebHook = async (req: Request, res: Response, next: NextFunction) => {
    console.log('postWebHook')
    console.log(req.body);
    return res.status(200).json({
        status: 'ok',
        result: JSON.stringify(req.body),
    })
}

export default {
    getTest,
    postWebHook,
    getRedisTest
};
