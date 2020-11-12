import type { ValidationPipeOptions } from '@nestjs/common';

export const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  validationError: { target: false },
  // skipMissingProperties: true,
  // disableErrorMessages: !apiConfigService.isDev(),
  transform: true,
  stopAtFirstError: true,
  // dismissDefaultMessages: true,
} as ValidationPipeOptions;
