import type { HttpHeaders, HttpParams } from '@angular/common/http';

export {};

declare global {
  type Extras = {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    observe?: 'body';
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: Record<string, any>;
  };

  type PageEvent = {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    first: number;
    rows: number;
    page: number;
    pageCount?: number;
  };
}
