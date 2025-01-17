import {AuthUser} from '@/features/users/users.type';

import jwt from 'jsonwebtoken';

import config from '@/config/index';

const accessKey = config.auth.accessKey ? config.auth.accessKey : '';
const refreshKey = config.auth.refreshKey ? config.auth.refreshKey : '';

export const sign = (user: AuthUser) => {
  return jwt.sign(user, accessKey, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
}

export const refresh = (user: AuthUser) => {
  return jwt.sign(user, refreshKey, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
}

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(
      token, 
      refreshKey,
      { 
        algorithms: ['HS256'] 
      }
    );
    return { 
      ok: true,
      decoded,
    };
  } catch (err: any) {
    return {
      ok: false,
      message: err.message,
    }
  }
}