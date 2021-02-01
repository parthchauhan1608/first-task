import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component'
import { UserManagementComponent } from './user-management/user-management.component'
import { AuthGuardGuard } from './auth-guard.guard';
import { AuthLoginGuard } from './auth-login.guard'
import { AuthRoleGuard } from './auth-role.guard'
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate : [AuthLoginGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserDetailsComponent, canActivate: [AuthGuardGuard] },
  { path: 'users/:page', component: UserDetailsComponent,canActivate: [AuthGuardGuard] },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuardGuard] },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'changePassword/:id', component: ChangePasswordComponent},
  { path: 'userManage/:label/:id', component: UserManagementComponent,canActivate: [AuthGuardGuard,AuthRoleGuard] },
  { path: 'userManage/:label', component: UserManagementComponent,canActivate: [AuthGuardGuard,AuthRoleGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
