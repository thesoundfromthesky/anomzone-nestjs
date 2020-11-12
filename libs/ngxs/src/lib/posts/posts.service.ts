import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Post, PostsList } from '@typeorm/index';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private readonly httpClient: HttpClient) {}

  create$(body: Post, url: string, extras?: Extras): Observable<Post> {
    return this.httpClient.post<Post>(url, body, extras);
  }

  list$(url: string, extras?: Extras): Observable<PostsList> {
    return this.httpClient.get<PostsList>(url, extras);
  }

  get$(url: string, extras?: Extras): Observable<Post> {
    return this.httpClient.get<Post>(url, extras);
  }

  update$(body: Post, url: string, extras?: Extras): Observable<Post> {
    return this.httpClient.put<Post>(url, body, extras);
  }

  delete$(url: string, extras?: Extras): Observable<Post> {
    return this.httpClient.delete<Post>(url, extras);
  }
}
