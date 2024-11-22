import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, MyRoomsComponent, PageNotFoundComponent, RoomChatOverviewComponent } from './components/pages';
import { RoomsContainerComponent, AccountsContainerComponent } from './components/containers';

const routes: Routes = [

    { path: 'account', component: AccountsContainerComponent, children: [
        { path: 'login', component: LoginComponent },
    ] },
    { path: 'my-rooms', component: MyRoomsComponent},
    { path: 'my-rooms/:id/chat', component: RoomChatOverviewComponent},
    { path: '', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
