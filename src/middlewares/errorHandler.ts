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
            message = '필수 파라미터가 누락되었습니다';
            statusCode = 400;
            break;
        case 'ER0002':
            message = '회원 정보가 존재하지 않습니다';
            statusCode = 400;
            break;
        case 'ER0004':
            message = 'no authorized';
            statusCode = 401;
            break;
        case 'ER0006':
            message = '파라미터가 존재하지 않습니다';
            statusCode = 400;
            break;
        default:
            message = '서버 에러가 발생했습니다';
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
