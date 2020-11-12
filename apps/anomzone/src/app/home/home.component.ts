import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  WebSocketFacadeService,
  WebSocketFormService,
} from '@ngxs/lib/websocket';
import type { Client, ClientsList, Message } from '@ngxs/lib/websocket';
import type { Table } from 'primeng/table';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { FormGroup } from '@angular/forms';
import type { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  clients$!: Observable<ClientsList>;
  messages$!: Observable<Message[]>;
  me$!: Observable<Client>;
  cols = [
    { field: 'from', header: 'From', width: '15%' },
    { field: 'message', header: 'Message', width: '60%' },
    { field: 'createdAt', header: 'createdAt', width: '20%' },
  ];

  table!: Table;
  webSocketForm!: FormGroup;
  constructor(
    private readonly webSocketFacadeService: WebSocketFacadeService,
    private readonly webSocketFormService: WebSocketFormService
  ) {}

  ngOnInit(): void {
    this.webSocketForm = this.webSocketFormService.getWebSocketForm();
    this.clients$ = this.webSocketFacadeService.selectWebSocketClients$();
    this.me$ = this.webSocketFacadeService.selectWebSocketMe$();
    this.messages$ = this.webSocketFacadeService
      .selectWebSocketMessages$()
      .pipe(
        tap((messages) => {
          if (this.table) {
            // const pScroll = this.table.scrollableViewChild;
            // const cdkScroll = pScroll.virtualScrollBody as CdkVirtualScrollViewport;

            setTimeout(() => {
              this.table.scrollToVirtualIndex(messages.length);
            });
          }
        })
      );
  }

  sendMessage() {
    this.webSocketFormService.onSend(this.webSocketForm);
  }

  trackByFn(i: number, v: Client) {
    return v?.id || i;
  }

  lazyLoad(table: Table) {
    this.table = table;
    this.table.scrollToVirtualIndex(this.table.value.length);
  }
}
