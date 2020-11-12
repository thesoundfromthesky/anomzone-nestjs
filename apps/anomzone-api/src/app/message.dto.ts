import { Message } from '@ngxs/lib/websocket';
import { DtoValidators } from './core/validators';

export class MessageDto implements Message {
  id: string;
  from: string;

  @DtoValidators("websocket")
  message: string;
  createdAt: number;
}
