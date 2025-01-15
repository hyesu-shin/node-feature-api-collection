import {OperationType, QueryParams, SelectParams, InsertParams, UpdateParams, DeleteParams} from '@/types/common/models';

import knex from '@/utils/knex';

export default class IndexModel {
  async runQuery(
    client: string, 
    connection: any, 
    model: string,
    operationType: OperationType,
    params: QueryParams
  ) {
    const conn = !connection ? await knex({name: client}) : connection;

    try {
      switch (operationType) {
        case OperationType.SELECT: {
          const { selectFields, whereFields } = params as SelectParams;
          return conn(model)
            .select(selectFields?.length ? selectFields : '*')
            .where(whereFields || {});
        }

        case OperationType.INSERT: {
          const { insertFields } = params as InsertParams;
          return conn(model)
            .insert(insertFields);
        }

        case OperationType.UPDATE: {
          const { updateFields, whereFields } = params as UpdateParams;
          return conn(model)
            .update(updateFields)
            .where(whereFields);
        }

        case OperationType.DELETE: {
          const { whereFields } = params as DeleteParams;
          return conn(model)
            .delete()
            .where(whereFields); 
        }

        default:
          throw new Error(`Unsupported operationType: ${operationType}`);
      }
    } catch (err: any) {
      console.error(`Error executing ${operationType} on ${model}:`, err);
      throw err;
    }
  } 
}