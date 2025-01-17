import {Request, Response, NextFunction} from 'express';
import Joi from 'joi';

import {validateBodyRequest, validateParamsRequest, validateQueryRequest} from '@/middlewares/validation.middleware.ts';

export const validateGetItems = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const querySchema = Joi.object({
    fields: Joi.string().optional(),
    sort: Joi.string().optional(),
  });

  const isQueryValid: any = validateQueryRequest(querySchema, req, res);
    if (isQueryValid) next();
}

export const validateGetItemById = (
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

export const validateAddItems = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const bodySchema = Joi.object({
    name: Joi.string().required(),
    descrption: Joi.string().optional(),
  });

  const isBodyValid: any = validateBodyRequest(bodySchema, req, res);
  if (isBodyValid) next();
}

export const validateModifyItems = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const paramSchema = Joi.object({
    id: Joi.number().required(),
  });

  const bodySchema = Joi.object({
      name: Joi.string().required(),
      descrption: Joi.string().optional(),
  });

  const isParamValid: any = validateParamsRequest(paramSchema, req, res);
  const isBodyValid: any = validateBodyRequest(bodySchema, req, res);
  if (isParamValid && isBodyValid) {
      req.validatedMultiData = {...req.validatedQuery, ...req.validatedBody};
      next();
  }
}

export const validateDeleteItems = (
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