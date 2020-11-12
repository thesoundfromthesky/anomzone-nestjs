import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService, RouterService } from '@ng-util/index';
import type { Message } from 'primeng/api';
import { MessageService as ToastService } from 'primeng/api';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;
  message$!: Observable<Message | Message[]>;
  constructor(
    private readonly rs: RouterService,

    private readonly messageService: MessageService,
    private readonly toastService: ToastService
  ) {
    this.isLoading$ = this.rs.isLoading$();
    this.rs
      .isNavigationEnd$()
      .pipe(take(1))
      .subscribe(() => {
        this.message$ = this.messageService.messagesAsObservable$.pipe(
          tap((message) => {
            this.toastService.add(message);
          })
        );
      });
  }
  ngOnInit(): void {}
}
