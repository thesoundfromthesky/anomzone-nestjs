import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { RepliesList, Reply } from '@typeorm/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepliesService {
  constructor(private readonly httpClient: HttpClient) {}

  create$(body: Reply, url: string, extras?: Extras): Observable<Reply> {
    return this.httpClient.post<Reply>(url, body, extras);
  }

  list$(url: string, extras?: Extras): Observable<RepliesList> {
    return this.httpClient.get<RepliesList>(url, extras);
  }

  update$(body: Reply, url: string, extras?: Extras): Observable<Reply> {
    return this.httpClient.put<Reply>(url, body, extras);
  }

  delete$(url: string, extras?: Extras): Observable<Reply> {
    return this.httpClient.delete<Reply>(url, extras);
  }
}
