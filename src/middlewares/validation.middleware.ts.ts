import Joi from 'joi';
import {NextFunction, Request, Response} from 'express';

declare module 'express' {
    export interface Request {
        validatedQuery?: any;
        validatedBody?: any;
        validatedParams?: any;
        validatedMultiData?: any;
    }
}

const validateRequest = (
  schema: Joi.ObjectSchema,
  target: 'query' | 'body' | 'params', 
  req: Request, 
  res: Response
): boolean => {
  try {
      const {error, value} = schema.validate(req[target]);
      if (error) {
          res.status(400).json({error: error.details[0].message});
          return false;
      }
      if (target === 'query') req.validatedQuery = value;
      if (target === 'body') req.validatedBody = value;
      if (target === 'params') req.validatedParams = value;
      return true;
  } catch (err: any) {
      res.status(500).json({error: 'Internal Server Error'});
      return false;
  }
};

const validateQueryRequest = (
  schema: Joi.ObjectSchema, 
  req: Request, 
  res: Response
) => {
  return validateRequest(schema, 'query', req, res);
};

const validateParamsRequest = (
  schema: Joi.ObjectSchema, 
  req: Request, 
  res: Response
) => {
  return validateRequest(schema, 'params', req, res);
};

const validateBodyRequest = (
  schema: Joi.ObjectSchema, 
  req: Request, 
  res: Response
) => {
  return validateRequest(schema, 'body', req, res);
};

export {
  validateQueryRequest,
  validateParamsRequest,
  validateBodyRequest,
}