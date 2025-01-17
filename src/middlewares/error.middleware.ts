import {Express, Request, Response, NextFunction} from 'express';

export default (err: any, req: Request, res: Response) => {
    /**
     * err 객체에는 다음과 같은 항목이 포함된다
     * 1. code (필수)
     * 2. result
     * 3. message
     * 4. errorCode
     *
     * errHandler 의 return 객체에는 다음과 같은 항목이 포함된다
     * 1. code
     * 2. message
     * 3. result
     */

    let message: string;
    let statusCode: number = 500;
    const result: object = err.result ? err.result : {};
    const code: string = err.code ? err.code : 'ER0000';
    switch (code) {
        case 'ER0001':
          message = 'invalid identifier';
          statusCode = 401;
          break;
        case 'ER0002':
          message = 'invalid password';
          statusCode = 401;
          break;
        case 'ER0004':
          message = 'no authorized';
          statusCode = 401;
          break;
        case 'ER0005':
          message = 'insert failed';
          statusCode = 400;
          break;
        case 'ER0006':
          message = 'update failed';
          statusCode = 400;
          break;
        case 'ER0007':
          message = 'delete failed';
          statusCode = 400;
          break;
        default:
          message = 'unknown error';
          break;
    }

    const returnMessage = err.message ? err.message : message;

    return res
      .status(statusCode)
      .json({
          code,
          message: returnMessage,
          result
      });
};
