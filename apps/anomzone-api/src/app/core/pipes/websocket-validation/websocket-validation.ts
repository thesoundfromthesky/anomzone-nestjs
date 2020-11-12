import { WebsocketValidationPipe as _WebsocketValidationPipe } from './websocket-validation.pipe';
import { validationPipeOptions } from '../Validation-pipe.options';

export const WebsocketValidationPipe = new _WebsocketValidationPipe(
  validationPipeOptions
);
