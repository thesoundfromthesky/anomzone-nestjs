import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ApiConfigService } from '@server/app/core/config';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  exception!: Error;
  request!: Request;
  httpException!: HttpException;

  constructor(private readonly apiConfigService: ApiConfigService) {}

  catch(exception: Error, host: ArgumentsHost) {
    this.exception = exception;
    const ctx = host.switchToHttp();
    this.request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.getError();

    response
      .status(this.httpException.getStatus())
      .json(this.httpException.getResponse());
  }

  getError() {
    this.httpException = new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: this.exception.name,
      message: this.exception.message,
      method: this.request.method,
      path: this.request.url,
      timestamp: new Date().toLocaleString(),
    });

    Logger.error(
      `${this.request.method} ${this.request.url}`,
      JSON.stringify(this.httpException),
      'AllExceptionFilter'
    );

    if (!this.apiConfigService.isDev()) {
      this.httpException = new InternalServerErrorException();
    }
  }
}
