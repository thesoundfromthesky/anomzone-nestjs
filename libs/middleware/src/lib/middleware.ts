import * as cookie from 'cookie-parser';
import * as csrf from 'csurf';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const wsRateLimit = require('ws-rate-limit');
export const csurf = csrf({ cookie: true });
export const cookieParser = cookie();
export const wsRateLimiter = wsRateLimit('5s', 3);
