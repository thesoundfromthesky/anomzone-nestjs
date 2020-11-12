import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { EntityColumnNotFound } from 'typeorm/error/EntityColumnNotFound';
import { QueryFailedError } from 'typeorm';
import { ApiConfigService } from '@server/app/core/config';
import type { Request, Response } from 'express';

type TypeOrmException =
  | EntityNotFoundError
  | QueryFailedError
  | EntityColumnNotFound;

@Catch(EntityNotFoundError, QueryFailedError, EntityColumnNotFound)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  httpException!: HttpException;
  request!: Request;
  statusCode!: HttpStatus;
  HttpExceptionConstructor!: new (
    objectOrError?: unknown,
    description?: string
  ) => HttpException;
  exception!: TypeOrmException;

  constructor(private readonly apiConfigService: ApiConfigService) {}
  catch(exception: TypeOrmException, host: ArgumentsHost) {
    this.exception = exception;
    const ctx = host.switchToHttp();
    this.request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    switch (exception.constructor) {
      case EntityNotFoundError:
        this.statusCode = HttpStatus.NOT_FOUND;
        this.HttpExceptionConstructor = NotFoundException;
        break;
      case QueryFailedError:
        this.statusCode = HttpStatus.BAD_REQUEST;
        this.HttpExceptionConstructor = BadRequestException;
        break;
      case EntityColumnNotFound:
        this.statusCode = HttpStatus.BAD_REQUEST;
        this.HttpExceptionConstructor = BadRequestException;
        break;
    }

    this.getError();

    response
      .status(this.httpException.getStatus())
      .json(this.httpException.getResponse());
  }

  getError() {
    this.httpException = new this.HttpExceptionConstructor({
      statusCode: this.statusCode,
      error: this.exception.name,
      message: this.exception.message,
      method: this.request.method,
      path: this.request.url,
      timestamp: new Date().toLocaleString(),
    });

    Logger.error(
      `${this.request.method} ${this.request.url}`,
      JSON.stringify(this.httpException),
      'TypeOrmExceptionFilter'
    );

    if (!this.apiConfigService.isDev()) {
      this.httpException = new this.HttpExceptionConstructor();
    }
  }
}
