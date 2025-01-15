import { WhereFields, SelectFields, OrderByFields} from '@/types/common/models';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export default class IndexController {
  runController(fn: (req: Request) => Promise<any>): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await fn(req);
        if (!result.success) {
          return next(result);
        }
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    };
  };

  parseQuery(req: Request) {
    const whereFields: WhereFields = {};
    const selectFields: SelectFields = [];
    const orderByFields: OrderByFields = [];

    const query = req.query;

    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || key === 'sort' || key === 'fields') {
        continue;
      }

      if (typeof value !== 'string') {
        whereFields[key] = value;
        continue;
      }

      const valueArray = value.split(',');
      whereFields[key] = valueArray.length > 1 ? valueArray : valueArray[0];
    }

    if (query.fields && typeof query.fields === 'string') {
      const fields = query.fields.split(',') as [];
      selectFields.push(...fields);
    }

    if (query.sort && typeof query.sort === 'string') {
      const sortColumns = query.sort.split(',');

      for (const column of sortColumns) {
        if (column.startsWith('-')) {
          orderByFields.push({ column: column.slice(1), order: 'desc' });
        } else {
          orderByFields.push({ column: column, order: 'asc' });
        }
      }
    }

    return {
      selectFields,
      whereFields,
      orderByFields,
    }
  }

  parseParam(req: Request) {
    const whereFields: WhereFields = {};

    const params = req.params;

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) {
        continue;
      }

      if (typeof value !== 'string') {
        whereFields[key] = value;
        continue;
      }

      const valueArray = value.split(',');
      whereFields[key] = valueArray.length > 1 ? valueArray : valueArray[0];
    }

    return {
      whereFields,
    }
  }

  parseBody(req: Request) {
    const body = req.body;

    return {
      insertFields: body,
    };
  }

  parseParamAndBody(req: Request) {
    const body = req.body;
    const params = req.params;

    if (!params.id) {
      throw new Error('ID is required for modify operation');
    }

    return {
      updateFields: body,
      whereFields: {
        id: params.id,
      }
    };
  }
}


