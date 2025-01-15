export enum OperationType {
  SELECT = 'select',
  INSERT = 'insert',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type WhereFields = Record<string, any>;
export type InsertFields = Record<string, any>;
export type UpdateFields = Record<string, any>;
export type SelectFields = string[];
export type OrderByFields = { column: string; order: 'asc' | 'desc' }[];

export interface SelectParams {
  selectFields?: SelectFields,
  whereFields?: WhereFields,
  orderByFields?: OrderByFields,
}

export interface InsertParams {
  insertFields: InsertFields,
}

export interface UpdateParams {
  updateFields: UpdateFields,
  whereFields: WhereFields,
}

export interface DeleteParams {
  whereFields: WhereFields,
}

export type QueryParams = SelectParams | InsertParams | UpdateParams | DeleteParams;