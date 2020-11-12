import type { Reply } from '@typeorm/index';
import { REPLIES_STATE_TOKEN } from './replies-state.models';
import type { KeyReplyState } from './replies-state.models';

const prefix = `[${REPLIES_STATE_TOKEN.getName()}]`;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Replies {
  export class Page {
    static readonly type = `${prefix} PageEvent Replies`;
    constructor(
      public readonly commentId: number,
      public readonly pageEvent: PageEvent
    ) {}
  }

  export class Create {
    static readonly type = `${prefix} Create a Reply`;
    constructor(
      public readonly reply: Reply,
      public readonly commentId: number,
      public readonly url: string,
      public readonly extras?: Extras
    ) {}
  }

  export class List {
    static readonly type = `${prefix} List Replies`;
    constructor(
      public readonly commentId: number,
      public readonly url: string,
      public readonly extras?: Extras
    ) {}
  }

  export class Get {
    static readonly type = `${prefix} Get a Reply`;
  }

  export class Update {
    static readonly type = `${prefix} Update a Reply`;
    constructor(
      public readonly reply: Reply,
      public readonly commentId: number,
      public readonly url: string,
      public readonly extras?: Extras
    ) {}
  }

  export class Delete {
    static readonly type = `${prefix} Delete a Reply`;
    constructor(
      public readonly commentId: number,
      public readonly url: string,
      public readonly extras?: Extras
    ) {}
  }

  export class Reset {
    static readonly type = `${prefix} Reset Replies`;
    constructor(
      public readonly commentId: number,
      public readonly method?: KeyReplyState
    ) {}
  }
}
