import { LOADING_STATE_TOKEN } from './loading-state.model';

const prefix = `[${LOADING_STATE_TOKEN.getName()}]`;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Loading {
  export class Start {
    static readonly type = `${prefix} Start Loading`;
  }

  export class Finish {
    static readonly type = `${prefix} Finish Loading`;
  }
}
