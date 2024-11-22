import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  LoginComponent, MyRoomsComponent, PageNotFoundComponent, RoomsContainerComponent,
  AccountsContainerComponent, RoomCardComponent
} from './components';
import { RoomChatOverviewComponent } from './components/pages/room-chat-overview/room-chat-overview.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyRoomsComponent,
    PageNotFoundComponent,
    RoomsContainerComponent,
    AccountsContainerComponent,
    RoomCardComponent,
    RoomChatOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
