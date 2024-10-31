import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, MyRoomsComponent, RoomOverviewComponent, RoomChatComponent, RoomFilesComponent, PageNotFoundComponent } from './components/pages';
import { RoomsContainerComponent, AccountsContainerComponent } from './components/containers';

const routes: Routes = [

    { path: 'account', component: AccountsContainerComponent, children: [
        { path: 'login', component: LoginComponent },
    ] },
    { path: 'rooms', component: RoomsContainerComponent, children: [
        { path: ':id', component: RoomOverviewComponent },
        { path: ':id/chat', component: RoomChatComponent },
        { path: ':id/files', component: RoomFilesComponent }
    ] },

    { path: '', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
