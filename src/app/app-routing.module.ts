import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RecoverPasswordPageComponent } from './pages/recover-password-page/recover-password-page.component';
import { RegistrationEmployeePageComponent } from './pages/registration-employee-page/registration-employee-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { UpdatePasswordPageComponent } from './pages/update-password-page/update-password-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutPageComponent },
  { path: 'recover-password', component: RecoverPasswordPageComponent },
  { path: 'reset-password', component: ResetPasswordPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'profile/password', component: UpdatePasswordPageComponent },
  { path: 'employees/create', component: RegistrationEmployeePageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireciona para login por padrão
  { path: '**', redirectTo: '/login' }  // Lida com rotas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
