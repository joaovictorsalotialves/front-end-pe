import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './pages/auth-flow/login-page/login-page.component';
import { RecoverPasswordPageComponent } from './pages/auth-flow/recover-password-page/recover-password-page.component';
import { ResetPasswordPageComponent } from './pages/auth-flow/reset-password-page/reset-password-page.component';
import { RegistrationDonationCategoryPageComponent } from './pages/donation-category/registration-donation-category-page/registration-donation-category-page.component';
import { DetailEmployeePageComponent } from './pages/employee/detail-employee-page/detail-employee-page.component';
import { RegistrationEmployeePageComponent } from './pages/employee/registration-employee-page/registration-employee-page.component';
import { ViewEmployeePageComponent } from './pages/employee/view-employee-page/view-employee-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LogoutPageComponent } from './pages/profile/logout-page/logout-page.component';
import { ProfilePageComponent } from './pages/profile/profile-page/profile-page.component';
import { UpdatePasswordPageComponent } from './pages/profile/update-password-page/update-password-page.component';
import { RegistrationUserPageComponent } from './pages/user/registration-user-page/registration-user-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutPageComponent },
  { path: 'recover-password', component: RecoverPasswordPageComponent },
  { path: 'reset-password', component: ResetPasswordPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'profile/password', component: UpdatePasswordPageComponent },
  { path: 'employees/create', component: RegistrationEmployeePageComponent },
  { path: 'employees/view', component: ViewEmployeePageComponent },
  { path: 'employees/detail/:idEmployee', component: DetailEmployeePageComponent },
  { path: 'users/create', component: RegistrationUserPageComponent },
  { path: 'donation-category/create', component: RegistrationDonationCategoryPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireciona para login por padrão
  { path: '**', redirectTo: '/login' }  // Lida com rotas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
