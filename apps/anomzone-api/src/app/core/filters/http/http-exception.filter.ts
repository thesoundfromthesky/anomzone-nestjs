import { Catch, HttpException, Logger } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Request, Response } from 'express';

import { ApiConfigService } from '@server/app/core/config';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  httpException!: HttpException;
  request!: Request;
  exception!: HttpException;

  constructor(private readonly apiConfigService: ApiConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
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
    const statusCode = this.exception.getStatus();
    const response = this.exception.getResponse() as {
      error: string;
      message: string;
    };

    const errorResponse = {
      statusCode,
      error: response.error,
      message: response.message,
      method: this.request.method,
      path: this.request.url,
      timestamp: new Date().toLocaleString(),
    };

    if (!errorResponse.error) {
      delete errorResponse.error;
    }

    this.httpException = new HttpException(errorResponse, statusCode);

    Logger.error(
      `${this.request.method} ${this.request.url}`,
      JSON.stringify(this.httpException),
      'HttpExceptionFilter'
    );

    if (!this.apiConfigService.isDev()) {
      this.httpException = this.exception;
    }
  }
}
