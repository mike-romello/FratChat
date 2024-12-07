import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, MyRoomsComponent, RoomChatOverviewComponent } from './components/pages';
import { AccountsContainerComponent } from './components/containers';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    // Account-related routes
    {
      path: 'account',
      component: AccountsContainerComponent,
      children: [
        { path: 'login', component: LoginComponent }, // Login is public
      ],
    },
    // Protected routes (guarded)
    { path: 'my-rooms', component: MyRoomsComponent, canActivate: [AuthGuard] },
    { path: 'my-rooms/:id/chat', component: RoomChatOverviewComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/account/login', pathMatch: 'full' }, // Default route
    { path: '**', redirectTo: '/account/login' }, // Wildcard for undefined routes
  ];
  

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
