import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MyRoomsComponent } from './components/pages/my-rooms/my-rooms.component';
import { RoomOverviewComponent } from './components/pages/room-overview/room-overview.component';
import { RoomChatComponent } from './components/pages/room-chat/room-chat.component';
import { RoomFilesComponent } from './components/pages/room-files/room-files.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { RoomsContainerComponent } from './components/containers/rooms-container/rooms-container.component';
import { AccountsContainerComponent } from './components/containers/accounts-container/accounts-container.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyRoomsComponent,
    RoomOverviewComponent,
    RoomChatComponent,
    RoomFilesComponent,
    PageNotFoundComponent,
    AppBarComponent,
    RoomsContainerComponent,
    AccountsContainerComponent
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
