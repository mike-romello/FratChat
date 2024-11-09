import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  LoginComponent, MyRoomsComponent, RoomOverviewComponent, RoomChatComponent,
  RoomFilesComponent, PageNotFoundComponent, AppBarComponent, RoomsContainerComponent,
  AccountsContainerComponent, RoomCardComponent
} from './components';


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
    AccountsContainerComponent,
    RoomCardComponent
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
