import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  LoginComponent, MyRoomsComponent, RoomOverviewComponent, RoomChatLandingComponent,
  RoomFilesComponent, PageNotFoundComponent, AppBarComponent, RoomsContainerComponent,
  AccountsContainerComponent, RoomCardComponent
} from './components';
import { ChatAreaComponent } from './components/pages/room-chat-landing/chat-area/chat-area.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyRoomsComponent,
    RoomOverviewComponent,
    RoomChatLandingComponent,
    RoomFilesComponent,
    PageNotFoundComponent,
    AppBarComponent,
    RoomsContainerComponent,
    AccountsContainerComponent,
    RoomCardComponent,
    ChatAreaComponent
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
