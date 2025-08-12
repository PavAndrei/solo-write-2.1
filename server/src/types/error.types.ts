import { Error as MongooseError } from 'mongoose';

export interface CustomError extends Error {
  statusCode?: number;
}

export interface MongoDuplicateKeyError extends Error {
  code: number;
  keyPattern: Record<string, any>;
  keyValue: Record<string, any>;
}

export interface MongooseValidationError extends MongooseError {
  errors: Record<
    string,
    MongooseError.ValidatorError | MongooseError.CastError
  >;
}

export type AppError =
  | CustomError
  | MongoDuplicateKeyError
  | MongooseValidationError
  | Error;
