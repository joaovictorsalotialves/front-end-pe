import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailAdoptionPageComponent } from './pages/adoption/detail-adoption-page/detail-adoption-page.component';
import { RegistrationAdoptionPageComponent } from './pages/adoption/registration-adoption-page/registration-adoption-page.component';
import { ViewAdoptionPageComponent } from './pages/adoption/view-adoption-page/view-adoption-page.component';
import { DetailAnimalPageComponent } from './pages/animal/detail-animal-page/detail-animal-page.component';
import { RegistrationAnimalPageComponent } from './pages/animal/registration-animal-page/registration-animal-page.component';
import { ReportAnimalPageComponent } from './pages/animal/report-animal-page/report-animal-page.component';
import { ViewAnimalPageComponent } from './pages/animal/view-animal-page/view-animal-page.component';
import { LoginPageComponent } from './pages/auth-flow/login-page/login-page.component';
import { RecoverPasswordPageComponent } from './pages/auth-flow/recover-password-page/recover-password-page.component';
import { ResetPasswordPageComponent } from './pages/auth-flow/reset-password-page/reset-password-page.component';
import { DetailClinicalReportPageComponent } from './pages/clinical-report/detail-clinical-report-page/detail-clinical-report-page.component';
import { RegistrationClinicalReportPageComponent } from './pages/clinical-report/registration-clinical-report-page/registration-clinical-report-page.component';
import { ViewClinicalReportPageComponent } from './pages/clinical-report/view-clinical-report-page/view-clinical-report-page.component';
import { DetailDonationCategoryPageComponent } from './pages/donation-category/detail-donation-category-page/detail-donation-category-page.component';
import { RegistrationDonationCategoryPageComponent } from './pages/donation-category/registration-donation-category-page/registration-donation-category-page.component';
import { ViewDonationCategoryPageComponent } from './pages/donation-category/view-donation-category-page/view-donation-category-page.component';
import { DetailDonationPageComponent } from './pages/donation/detail-donation-page/detail-donation-page.component';
import { RegistrationDonationPageComponent } from './pages/donation/registration-donation-page/registration-donation-page.component';
import { ReportDonationPageComponent } from './pages/donation/report-donation-page/report-donation-page.component';
import { ViewDonationPageComponent } from './pages/donation/view-donation-page/view-donation-page.component';
import { DetailEmployeePageComponent } from './pages/employee/detail-employee-page/detail-employee-page.component';
import { RegistrationEmployeePageComponent } from './pages/employee/registration-employee-page/registration-employee-page.component';
import { ViewEmployeePageComponent } from './pages/employee/view-employee-page/view-employee-page.component';
import { DetailExpenseCategoryPageComponent } from './pages/expense-category/detail-expense-category-page/detail-expense-category-page.component';
import { RegistrationExpenseCategoryPageComponent } from './pages/expense-category/registration-expense-category-page/registration-expense-category-page.component';
import { ViewExpenseCategoryPageComponent } from './pages/expense-category/view-expense-category-page/view-expense-category-page.component';
import { DetailExpensePageComponent } from './pages/expense/detail-expense-page/detail-expense-page.component';
import { RegistrationExpensePageComponent } from './pages/expense/registration-expense-page/registration-expense-page.component';
import { ReportExpensePageComponent } from './pages/expense/report-expense-page/report-expense-page.component';
import { ViewExpensePageComponent } from './pages/expense/view-expense-page/view-expense-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LogoutPageComponent } from './pages/profile/logout-page/logout-page.component';
import { ProfilePageComponent } from './pages/profile/profile-page/profile-page.component';
import { UpdatePasswordPageComponent } from './pages/profile/update-password-page/update-password-page.component';
import { DetailRacePageComponent } from './pages/race/detail-race-page/detail-race-page.component';
import { RegistrationRacePageComponent } from './pages/race/registration-race-page/registration-race-page.component';
import { ViewRacePageComponent } from './pages/race/view-race-page/view-race-page.component';
import { DetailSpeciesPageComponent } from './pages/species/detail-species-page/detail-species-page.component';
import { RegistrationSpeciesPageComponent } from './pages/species/registration-species-page/registration-species-page.component';
import { ViewSpeciesPageComponent } from './pages/species/view-species-page/view-species-page.component';
import { DetailSupplementCategoryPageComponent } from './pages/supplement-category/detail-supplement-category-page/detail-supplement-category-page.component';
import { RegistrationSupplementCategoryPageComponent } from './pages/supplement-category/registration-supplement-category-page/registration-supplement-category-page.component';
import { ViewSupplementCategoryPageComponent } from './pages/supplement-category/view-supplement-category-page/view-supplement-category-page.component';
import { DetailSupplementInputPageComponent } from './pages/supplement-input/detail-supplement-input-page/detail-supplement-input-page.component';
import { RegistrationSupplementInputPageComponent } from './pages/supplement-input/registration-supplement-input-page/registration-supplement-input-page.component';
import { ViewSupplementInputPageComponent } from './pages/supplement-input/view-supplement-input-page/view-supplement-input-page.component';
import { DetailSupplementOutputPageComponent } from './pages/supplement-output/detail-supplement-output-page/detail-supplement-output-page.component';
import { RegistrationSupplementOutputPageComponent } from './pages/supplement-output/registration-supplement-output-page/registration-supplement-output-page.component';
import { ViewSupplementOutputPageComponent } from './pages/supplement-output/view-supplement-output-page/view-supplement-output-page.component';
import { DetailSupplementPageComponent } from './pages/supplement/detail-supplement-page/detail-supplement-page.component';
import { RegistrationSupplementPageComponent } from './pages/supplement/registration-supplement-page/registration-supplement-page.component';
import { ReportSupplementPageComponent } from './pages/supplement/report-supplement-page/report-supplement-page.component';
import { ViewSupplementPageComponent } from './pages/supplement/view-supplement-page/view-supplement-page.component';
import { DetailUserPageComponent } from './pages/user/detail-user-page/detail-user-page.component';
import { RegistrationUserPageComponent } from './pages/user/registration-user-page/registration-user-page.component';
import { ViewUserPageComponent } from './pages/user/view-user-page/view-user-page.component';

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
  { path: 'users/view', component: ViewUserPageComponent },
  { path: 'users/detail/:idUser', component: DetailUserPageComponent },

  { path: 'donations/create', component: RegistrationDonationPageComponent },
  { path: 'donations/view', component: ViewDonationPageComponent },
  { path: 'donations/report', component: ReportDonationPageComponent },
  { path: 'donations/detail/:idDonation', component: DetailDonationPageComponent },

  { path: 'donation-categories/create', component: RegistrationDonationCategoryPageComponent },
  { path: 'donation-categories/view', component: ViewDonationCategoryPageComponent },
  { path: 'donation-categories/detail/:idDonationCategory', component: DetailDonationCategoryPageComponent },

  { path: 'animals/create', component: RegistrationAnimalPageComponent },
  { path: 'animals/view', component: ViewAnimalPageComponent },
  { path: 'animals/report', component: ReportAnimalPageComponent },
  { path: 'animals/detail/:idAnimal', component: DetailAnimalPageComponent },

  { path: 'animals/:idAnimal/clinical-reports/create', component: RegistrationClinicalReportPageComponent },
  { path: 'animals/:idAnimal/clinical-reports/view', component: ViewClinicalReportPageComponent },
  { path: 'animals/:idAnimal/clinical-reports/detail/:idClinicalReport', component: DetailClinicalReportPageComponent },

  { path: 'species/create', component: RegistrationSpeciesPageComponent },
  { path: 'species/view', component: ViewSpeciesPageComponent },
  { path: 'species/detail/:idSpecies', component: DetailSpeciesPageComponent },

  { path: 'races/create', component: RegistrationRacePageComponent },
  { path: 'races/view', component: ViewRacePageComponent },
  { path: 'races/detail/:idRace', component: DetailRacePageComponent },

  { path: 'adoptions/create', component: RegistrationAdoptionPageComponent },
  { path: 'adoptions/view', component: ViewAdoptionPageComponent },
  { path: 'adoptions/detail/:idAdoption', component: DetailAdoptionPageComponent },

  { path: 'expenses/create', component: RegistrationExpensePageComponent },
  { path: 'expenses/view', component: ViewExpensePageComponent },
  { path: 'expenses/report', component: ReportExpensePageComponent },
  { path: 'expenses/detail/:idExpense', component: DetailExpensePageComponent },

  { path: 'expense-categories/create', component: RegistrationExpenseCategoryPageComponent },
  { path: 'expense-categories/view', component: ViewExpenseCategoryPageComponent },
  { path: 'expense-categories/detail/:idExpenseCategory', component: DetailExpenseCategoryPageComponent },

  { path: 'supplements/create', component: RegistrationSupplementPageComponent },
  { path: 'supplements/view', component: ViewSupplementPageComponent },
  { path: 'supplements/report', component: ReportSupplementPageComponent },
  { path: 'supplements/detail/:idSupplement', component: DetailSupplementPageComponent },

  { path: 'supplement-inputs/create', component: RegistrationSupplementInputPageComponent },
  { path: 'supplement-inputs/view', component: ViewSupplementInputPageComponent },
  { path: 'supplement-inputs/detail/:idSupplementInput', component: DetailSupplementInputPageComponent },

  { path: 'supplement-outputs/create', component: RegistrationSupplementOutputPageComponent },
  { path: 'supplement-outputs/view', component: ViewSupplementOutputPageComponent },
  { path: 'supplement-outputs/detail/:idSupplementOutput', component: DetailSupplementOutputPageComponent },

  { path: 'supplement-categories/create', component: RegistrationSupplementCategoryPageComponent },
  { path: 'supplement-categories/view', component: ViewSupplementCategoryPageComponent },
  { path: 'supplement-categories/detail/:idSupplementCategory', component: DetailSupplementCategoryPageComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireciona para login por padrão
  { path: '**', redirectTo: '/login' }  // Lida com rotas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
