import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { NgxsModule } from '@ngxs/store';
import { getEcologyState, getNgxsConfig } from '@ngxs/lib/store';
import { LayoutModule } from './layout';
import { SharedModule } from './shared';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { NgxsWebsocketPluginModule } from '@ngxs/websocket-plugin';
import { environment } from '@client/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    NgxsModule.forRoot(getEcologyState(), getNgxsConfig(environment)),
    NgxsWebsocketPluginModule.forRoot({
      url: `${environment.wsProtocol}${location.host}/ws`,
      typeKey: 'event',
    }),
    LayoutModule,
    SharedModule,
  ],
  providers: [
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
