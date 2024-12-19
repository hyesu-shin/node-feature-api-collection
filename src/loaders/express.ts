import {Express, Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// config
import config from '@/controllers/config';

import indexRouter from '@/apis';
import errorHandler from '@/middlewares/errorHandler';

// import {morganMiddleware} from '@/middlewares/logs/logger';

export default async ({app}: { app: Express }) => {
    console.log('expressLoader');

    app.get('/status', (req: Request, res: Response) => {
        res.status(200).end();
    });

    interface originType {
        [key: string]: any;
    }

    const allowOrigin: originType = {
        DEVELOPMENT: ['http://localhost:8080', 'http://localhost:3000', /\.domain\.com$/ , /\.domain\.kr$/],
        PRODUCTION: [],
    }

    app.use(cors({
        origin: function (origin, callback) {
            // 만약 allowOrigin 에 origin 이 포함되어 있지 않다면 cors error
            if (!origin) {
                return callback(null, true)
            }

            if (config.environment === 'DEVELOPMENT') {
                return callback(null, true)
            }

            for (const ao of allowOrigin[config.environment]) {
                if (origin && origin.search(ao) !== -1) {
                    return callback(null, true);
                }
            }

            return callback(new Error('Not allowed by CORS'))

            // if (allowOrigin[config.environment].indexOf(origin) !== -1 || (config.environment === 'DEVELOPMENT' && !origin)) {
            //     callback(null, true)
            // } else {
            //     callback(new Error('Not allowed by CORS'))
            // }
        },
        credentials: true,
        maxAge: 3600,
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // app.use(morganMiddleware);
    app.use('/', indexRouter());
    // app.use('/api/v1', indexRouter());

    // catch 404
    app.use((req: Request, res: any, next: NextFunction) => {
        const err: any = new Error('Not Found');

        return res
            .status(404)
            .json({
                message: '페이지를 찾을 수 없습니다',
            });
    });

    // error handlers
    app.use((err: any, req: Request, res: any, next: NextFunction) => {
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .json({
                    result: err,
                });
        }
        return next(err);
    });

    app.use((err: any, req: Request, res: any, next: NextFunction) => {
        if (err.status === 500) {
            return res
                .status(err.status)
                .json({
                    result: err,
                })
        }
        return errorHandler(err, req, res);
    });
};
