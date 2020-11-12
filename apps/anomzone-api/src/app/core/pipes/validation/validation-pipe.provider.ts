import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeOptions } from '../Validation-pipe.options';

// import { ApiConfigService } from '@src/core/config';

export const validationPipeProvider = {
  provide: APP_PIPE,
  // inject: [ApiConfigService],
  useFactory: (/*apiConfigService: ApiConfigService*/) => {
    return new ValidationPipe(validationPipeOptions);
  },
};
