import {Express} from 'express';
import 'reflect-metadata';

import expressLoader from '@/loaders/express';

export default async ({expressApp}: { expressApp: Express }) => {
    console.log('indexLoader');

    await expressLoader({app: expressApp});
};