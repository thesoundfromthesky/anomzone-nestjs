import {
  ArgumentMetadata,
  Injectable,
  Optional,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import type { PipeTransform, ValidationPipeOptions } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WebsocketValidationPipe extends ValidationPipe
  implements PipeTransform {
  constructor(
    @Optional()
    options?: ValidationPipeOptions
  ) {
    super(options);
  }

  createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      if (this.isDetailedOutputDisabled) {
        return new WsException(undefined);
      }
      const errors = this.flattenValidationErrors(validationErrors);
      return new WsException({
        status: 'error',
        message: errors,
        timestamp: new Date().toLocaleString(),
      });
    };
  }

  transform(value: unknown, metadata: ArgumentMetadata) {
    return super.transform(value, metadata);
  }
}
