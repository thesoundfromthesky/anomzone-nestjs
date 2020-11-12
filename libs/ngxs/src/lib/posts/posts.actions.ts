import type { Post } from '@typeorm/index';
import { POSTS_STATE_TOKEN } from './posts-state.models';

const prefix = `[${POSTS_STATE_TOKEN.getName()}]`;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Posts {
  export class Page {
    static readonly type = `${prefix} PageEvent Posts`;
    constructor(public readonly pageEvent: PageEvent) {}
  }

  export class Create {
    static readonly type = `${prefix} Create a Post`;
    constructor(
      public readonly post: Post,
      public readonly url: string,
      public readonly extras?: Extras
    ) {}
  }

  export class List {
    static readonly type = `${prefix} List Posts`;
    constructor(public readonly url: string, public readonly extras?: Extras) {}
  }

  export class Get {
    static readonly type = `${prefix} Get a Post`;
    constructor(public readonly url: string, public readonly extras?: Extras) {}
  }

  export class Update {
    static readonly type = `${prefix} Update a Post`;
    constructor(
      public readonly post: Post,
      public readonly url: string,
      public readonly extras?: Extras
    ) {}
  }

  export class Delete {
    static readonly type = `${prefix} Delete a Post`;
    constructor(public readonly url: string, public readonly extras?: Extras) {}
  }

  export class Reset {
    static readonly type = `${prefix} Reset Posts`;
  }
}
