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
import { ChatAreaComponent } from './components/comp/chat-area/chat-area.component';
import { MessageComponent } from './components/comp/message/message.component';
import { ChatInputComponent } from './components/comp/chat-input/chat-input.component';
import { FormsModule } from '@angular/forms';


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
    ChatAreaComponent,
    MessageComponent,
    ChatInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
