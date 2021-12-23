import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  {
    path : 'home', component : HomeComponent
  },
  {
    path : 'admin', component : AdminComponent, canActivate: [AuthGuard], data: {roles : ['ADMIN']}
  },
  {
    path : 'user', component : UserComponent,  canActivate: [AuthGuard], data: {roles : ['MEMBER']}
  },
  {
    path : 'login', component : LoginComponent
  },
  {
    path : 'forbidden', component : ForbiddenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
