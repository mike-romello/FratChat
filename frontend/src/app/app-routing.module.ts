import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, MyRoomsComponent, RoomOverviewComponent, RoomChatComponent, RoomFilesComponent, PageNotFoundComponent } from './components/pages';
import { RoomsContainerComponent, AccountsContainerComponent } from './components/containers';

const routes: Routes = [

    { path: 'account', component: AccountsContainerComponent, children: [
        { path: 'login', component: LoginComponent },
    ] },
    { path: '', component: RoomsContainerComponent, children: [
        { path: 'my-rooms', component: MyRoomsComponent },
        { path: 'room', children: [
            { path: 'overview', component: RoomOverviewComponent },
            { path: 'chat', component: RoomChatComponent },
            { path: 'files', component: RoomFilesComponent }
        ] },
    ] },

    
    { path: '', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
