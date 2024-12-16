import {Container} from 'typedi';
import {Request, Response, NextFunction} from 'express';

import TestService from '@/services/tests/test.service';

const test: TestService = Container.get(TestService);


const getTest = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        result: 'ok',
    })
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
