import {Request, Response, NextFunction} from 'express';
import Joi from 'joi';

import {validateBodyRequest, validateParamsRequest, validateQueryRequest} from '@/middlewares/validation.middleware.ts';

export const validateGetUserById = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const paramSchema = Joi.object({
    id: Joi.number().required(),
  });

  const isParamValid: any = validateParamsRequest(paramSchema, req, res);
  if (isParamValid) next();
}

export const validateUserLogin = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const bodySchema = Joi.object({
    identifier: Joi.string().required(),
    password: Joi.string().required(),
    deviceId: Joi.string().required(),
  });

  const isBodyValid: any = validateBodyRequest(bodySchema, req, res);
  if (isBodyValid) next();
}

export const validateUserLogout = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const bodySchema = Joi.object({
    id: Joi.number().required(),
    deviceId: Joi.string().required(),
  });

  const isBodyValid: any = validateBodyRequest(bodySchema, req, res);
  if (isBodyValid) next();
}

export const validateUserRefresh = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const bodySchema = Joi.object({
    id: Joi.number().required(),
    deviceId: Joi.string().required(),
  });

  const isBodyValid: any = validateBodyRequest(bodySchema, req, res);
  if (isBodyValid) next();
}