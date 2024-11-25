import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { DirectivesModule } from '../directives/directives.module';
import { DetailAdoptionPageComponent } from './adoption/detail-adoption-page/detail-adoption-page.component';
import { RegistrationAdoptionPageComponent } from './adoption/registration-adoption-page/registration-adoption-page.component';
import { ViewAdoptionPageComponent } from './adoption/view-adoption-page/view-adoption-page.component';
import { DetailAnimalPageComponent } from './animal/detail-animal-page/detail-animal-page.component';
import { RegistrationAnimalPageComponent } from './animal/registration-animal-page/registration-animal-page.component';
import { ViewAnimalPageComponent } from './animal/view-animal-page/view-animal-page.component';
import { LoginPageComponent } from './auth-flow/login-page/login-page.component';
import { RecoverPasswordPageComponent } from './auth-flow/recover-password-page/recover-password-page.component';
import { ResetPasswordPageComponent } from './auth-flow/reset-password-page/reset-password-page.component';
import { DetailClinicalReportPageComponent } from './clinical-report/detail-clinical-report-page/detail-clinical-report-page.component';
import { RegistrationClinicalReportPageComponent } from './clinical-report/registration-clinical-report-page/registration-clinical-report-page.component';
import { ViewClinicalReportPageComponent } from './clinical-report/view-clinical-report-page/view-clinical-report-page.component';
import { DetailDonationCategoryPageComponent } from './donation-category/detail-donation-category-page/detail-donation-category-page.component';
import { RegistrationDonationCategoryPageComponent } from './donation-category/registration-donation-category-page/registration-donation-category-page.component';
import { ViewDonationCategoryPageComponent } from './donation-category/view-donation-category-page/view-donation-category-page.component';
import { DetailDonationPageComponent } from './donation/detail-donation-page/detail-donation-page.component';
import { RegistrationDonationPageComponent } from './donation/registration-donation-page/registration-donation-page.component';
import { ViewDonationPageComponent } from './donation/view-donation-page/view-donation-page.component';
import { DetailEmployeePageComponent } from './employee/detail-employee-page/detail-employee-page.component';
import { RegistrationEmployeePageComponent } from './employee/registration-employee-page/registration-employee-page.component';
import { ViewEmployeePageComponent } from './employee/view-employee-page/view-employee-page.component';
import { DetailExpenseCategoryPageComponent } from './expense-category/detail-expense-category-page/detail-expense-category-page.component';
import { RegistrationExpenseCategoryPageComponent } from './expense-category/registration-expense-category-page/registration-expense-category-page.component';
import { ViewExpenseCategoryPageComponent } from './expense-category/view-expense-category-page/view-expense-category-page.component';
import { DetailExpensePageComponent } from './expense/detail-expense-page/detail-expense-page.component';
import { RegistrationExpensePageComponent } from './expense/registration-expense-page/registration-expense-page.component';
import { ViewExpensePageComponent } from './expense/view-expense-page/view-expense-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { LogoutPageComponent } from './profile/logout-page/logout-page.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { UpdatePasswordPageComponent } from './profile/update-password-page/update-password-page.component';
import { DetailRacePageComponent } from './race/detail-race-page/detail-race-page.component';
import { RegistrationRacePageComponent } from './race/registration-race-page/registration-race-page.component';
import { ViewRacePageComponent } from './race/view-race-page/view-race-page.component';
import { DetailSpeciesPageComponent } from './species/detail-species-page/detail-species-page.component';
import { RegistrationSpeciesPageComponent } from './species/registration-species-page/registration-species-page.component';
import { ViewSpeciesPageComponent } from './species/view-species-page/view-species-page.component';
import { DetailSupplementCategoryPageComponent } from './supplement-category/detail-supplement-category-page/detail-supplement-category-page.component';
import { RegistrationSupplementCategoryPageComponent } from './supplement-category/registration-supplement-category-page/registration-supplement-category-page.component';
import { ViewSupplementCategoryPageComponent } from './supplement-category/view-supplement-category-page/view-supplement-category-page.component';
import { DetailSupplementInputPageComponent } from './supplement-input/detail-supplement-input-page/detail-supplement-input-page.component';
import { RegistrationSupplementInputPageComponent } from './supplement-input/registration-supplement-input-page/registration-supplement-input-page.component';
import { ViewSupplementInputPageComponent } from './supplement-input/view-supplement-input-page/view-supplement-input-page.component';
import { DetailSupplementOutputPageComponent } from './supplement-output/detail-supplement-output-page/detail-supplement-output-page.component';
import { RegistrationSupplementOutputPageComponent } from './supplement-output/registration-supplement-output-page/registration-supplement-output-page.component';
import { ViewSupplementOutputPageComponent } from './supplement-output/view-supplement-output-page/view-supplement-output-page.component';
import { DetailSupplementPageComponent } from './supplement/detail-supplement-page/detail-supplement-page.component';
import { RegistrationSupplementPageComponent } from './supplement/registration-supplement-page/registration-supplement-page.component';
import { ViewSupplementPageComponent } from './supplement/view-supplement-page/view-supplement-page.component';
import { DetailUserPageComponent } from './user/detail-user-page/detail-user-page.component';
import { RegistrationUserPageComponent } from './user/registration-user-page/registration-user-page.component';
import { ViewUserPageComponent } from './user/view-user-page/view-user-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RecoverPasswordPageComponent,
    ResetPasswordPageComponent,
    HomePageComponent,
    LayoutPageComponent,
    LogoutPageComponent,
    ProfilePageComponent,
    UpdatePasswordPageComponent,
    RegistrationEmployeePageComponent,
    RegistrationUserPageComponent,
    RegistrationDonationCategoryPageComponent,
    ViewEmployeePageComponent,
    DetailEmployeePageComponent,
    DetailUserPageComponent,
    ViewUserPageComponent,
    ViewDonationCategoryPageComponent,
    DetailDonationCategoryPageComponent,
    DetailExpenseCategoryPageComponent,
    ViewExpenseCategoryPageComponent,
    RegistrationExpenseCategoryPageComponent,
    RegistrationRacePageComponent,
    ViewRacePageComponent,
    DetailRacePageComponent,
    DetailSpeciesPageComponent,
    ViewSpeciesPageComponent,
    RegistrationSpeciesPageComponent,
    RegistrationSupplementCategoryPageComponent,
    ViewSupplementCategoryPageComponent,
    DetailSupplementCategoryPageComponent,
    DetailAdoptionPageComponent,
    ViewAdoptionPageComponent,
    RegistrationAdoptionPageComponent,
    RegistrationDonationPageComponent,
    ViewDonationPageComponent,
    DetailDonationPageComponent,
    DetailExpensePageComponent,
    ViewExpensePageComponent,
    RegistrationExpensePageComponent,
    RegistrationSupplementPageComponent,
    DetailSupplementPageComponent,
    ViewSupplementPageComponent,
    ViewSupplementInputPageComponent,
    DetailSupplementInputPageComponent,
    RegistrationSupplementInputPageComponent,
    RegistrationSupplementOutputPageComponent,
    DetailSupplementOutputPageComponent,
    ViewSupplementOutputPageComponent,
    ViewAnimalPageComponent,
    RegistrationAnimalPageComponent,
    DetailAnimalPageComponent,
    DetailClinicalReportPageComponent,
    ViewClinicalReportPageComponent,
    RegistrationClinicalReportPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    ComponentsModule,
    DirectivesModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginPageComponent,
    RecoverPasswordPageComponent,
    ResetPasswordPageComponent,
    HomePageComponent,
    LogoutPageComponent,
    ProfilePageComponent,
    UpdatePasswordPageComponent,
    RegistrationEmployeePageComponent,
    RegistrationUserPageComponent,
    RegistrationDonationCategoryPageComponent,
    ViewEmployeePageComponent,
    DetailEmployeePageComponent,
    DetailUserPageComponent,
    ViewUserPageComponent,
    ViewDonationCategoryPageComponent,
    DetailDonationCategoryPageComponent,
    DetailExpenseCategoryPageComponent,
    ViewExpenseCategoryPageComponent,
    RegistrationExpenseCategoryPageComponent,
    RegistrationRacePageComponent,
    ViewRacePageComponent,
    DetailRacePageComponent,
    DetailSpeciesPageComponent,
    ViewSpeciesPageComponent,
    RegistrationSpeciesPageComponent,
    RegistrationSupplementCategoryPageComponent,
    ViewSupplementCategoryPageComponent,
    DetailSupplementCategoryPageComponent,
    DetailAdoptionPageComponent,
    ViewAdoptionPageComponent,
    RegistrationAdoptionPageComponent,
    RegistrationDonationPageComponent,
    ViewDonationPageComponent,
    DetailDonationPageComponent,
    DetailExpensePageComponent,
    ViewExpensePageComponent,
    RegistrationExpensePageComponent,
    RegistrationSupplementPageComponent,
    DetailSupplementPageComponent,
    ViewSupplementPageComponent,
    ViewSupplementInputPageComponent,
    DetailSupplementInputPageComponent,
    RegistrationSupplementInputPageComponent,
    RegistrationSupplementOutputPageComponent,
    DetailSupplementOutputPageComponent,
    ViewSupplementOutputPageComponent,
    ViewAnimalPageComponent,
    RegistrationAnimalPageComponent,
    DetailAnimalPageComponent,
    DetailClinicalReportPageComponent,
    ViewClinicalReportPageComponent,
    RegistrationClinicalReportPageComponent,
  ]
})
export class PagesModule { }
