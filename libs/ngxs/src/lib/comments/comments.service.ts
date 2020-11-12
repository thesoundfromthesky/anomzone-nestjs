import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type { Comment, CommentsList } from '@typeorm/index';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private readonly httpClient: HttpClient) {}

  create$(body: Comment, url: string, extras?: Extras): Observable<Comment> {
    return this.httpClient.post<Comment>(url, body, extras);
  }

  list$(url: string, extras?: Extras): Observable<CommentsList> {
    return this.httpClient.get<CommentsList>(url, extras);
  }

  update$(body: Comment, url: string, extras?: Extras): Observable<Comment> {
    return this.httpClient.put<Comment>(url, body, extras);
  }

  delete$(url: string, extras?: Extras): Observable<Comment> {
    return this.httpClient.delete<Comment>(url, extras);
  }
}
