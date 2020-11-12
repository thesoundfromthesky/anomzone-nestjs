import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import type { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages$ = new ReplaySubject<Message>();
  messagesAsObservable$ = this.messages$.asObservable();
  constructor() {}

  add(message: Message) {
    this.messages$.next(message);
  }
}
