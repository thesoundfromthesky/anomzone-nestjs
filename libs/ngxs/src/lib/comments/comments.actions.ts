import { COMMENTS_STATE_TOKEN } from './comments-state.models';
import type { Comment } from '@typeorm/index';

const prefix = `[${COMMENTS_STATE_TOKEN.getName()}]`;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Comments {
  export class Page {
    static readonly type = `${prefix} PageEvent Comments`;
    constructor(public readonly pageEvent: PageEvent) {}
  }

  export class Create {
    static readonly type = `${prefix} Create a Comment`;
    constructor(
      public readonly comment: Comment,
      public readonly url: string,
      public readonly extras?: Extras
    ) {}
  }

  export class List {
    static readonly type = `${prefix} List Comments`;
    constructor(public readonly url: string, public readonly extras?: Extras) {}
  }

  export class Get {
    static readonly type = `${prefix} Get a Comment`;
  }

  export class Update {
    static readonly type = `${prefix} Update a Comment`;
    constructor(
      public readonly comment: Comment,
      public readonly url: string,
      public readonly extras?: Extras
    ) {}
  }

  export class Delete {
    static readonly type = `${prefix} Delete a Comment`;
    constructor(public readonly url: string, public readonly extras?: Extras) {}
  }

  export class Reset {
    static readonly type = `${prefix} Reset Comments`;
  }
}
