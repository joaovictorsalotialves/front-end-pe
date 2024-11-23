import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { ISupplementInputRequest } from '../../../interfaces/supplement-inputs/supplement-input-request.interface';
import { DonationCategoriesService } from '../../../services/donation-categories.service';
import { DonationsService } from '../../../services/donations.service';
import { SupplementsService } from '../../../services/supplements.service';
import { UsersService } from '../../../services/users.service';
import { RegistrationDoantionFormController } from './registration-donation-form-controller';

@Component({
  selector: 'app-registration-donation-page',
  templateUrl: './registration-donation-page.component.html',
  styleUrl: './registration-donation-page.component.scss'
})
export class RegistrationDonationPageComponent extends RegistrationDoantionFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  usersList: { id: number; value: string; }[] = [];
  donationCategoriesList: { id: number; value: string; }[] = [];
  supplementList: { id: number; value: string; }[] = [];

  private readonly _router = inject(Router);
  private readonly _usersServices = inject(UsersService);
  private readonly _donationsServices = inject(DonationsService);
  private readonly _donationCategoriessServices = inject(DonationCategoriesService);
  private readonly _suppllementsServices = inject(SupplementsService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterUsersList();
    this.filterDonationCategoriesList();
    this.filterSupplementList();
  }

  updateFormField(field: string, value: string) {
    this.registrationDonationForm.patchValue({ [field]: value });
  }

  filterUsersList(nameUser: string | undefined = undefined) {
    this._usersServices.getUsers(nameUser).pipe().subscribe({
      next: (usersList) => {
        const transformedUsersList = usersList?.map((user) => ({
          id: user.idUser,
          value: user.nameUser
        }))
        this.usersList = transformedUsersList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  filterDonationCategoriesList(nameDonationCategory: string | undefined = undefined) {
    this._donationCategoriessServices.getDonationCategories(nameDonationCategory).pipe().subscribe({
      next: (donationCategoriesList) => {
        const transformedDonationCategoriesList = donationCategoriesList?.map((donationCategory) => ({
          id: donationCategory.idDonationCategory,
          value: donationCategory.nameDonationCategory,
        }))
        this.donationCategoriesList = transformedDonationCategoriesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  filterSupplementList(nameSupplement: string | undefined = undefined) {
    this.supplement_input_information.get('idSupplement')?.reset('');

    const supplementInputFields = this.supplement_input_information.value;
    const isSupplementInputEmpty = !supplementInputFields.amount && !supplementInputFields.idSupplement;

    if (isSupplementInputEmpty) {
      this.supplement_input_information.reset();
      this.supplement_input_information.markAsPristine();
      this.supplement_input_information.markAsUntouched();
    }

    this._suppllementsServices.getSupplements(nameSupplement).pipe().subscribe({
      next: (supplementList) => {
        const transformedSupplementList = supplementList?.map((supplement) => ({
          id: supplement.idSupplement,
          value: supplement.nameSupplement,
        }))
        this.supplementList = transformedSupplementList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  onSelectUser(event: { id: string, value: string }) {
    this.donation_information.patchValue({ 'nameUser': event.value });
    this.donation_information.patchValue({ 'idUser': event.id });
  }

  onSelectDonationCategory(event: { id: string, value: string }) {
    this.donation_information.patchValue({ 'nameDonationCategory': event.value });
    this.donation_information.patchValue({ 'idDonationCategory': event.id });
  }

  onSelectSupplement(event: { id: string, value: string }) {
    this.supplement_input_information.patchValue({ 'nameSupplement': event.value });
    this.supplement_input_information.patchValue({ 'idSupplement': event.id });
  }

  save() {
    this.submitted = true;

    const supplementInputFields = this.supplement_input_information.value;
    const isSupplementInputEmpty = !supplementInputFields.amount && !supplementInputFields.idSupplement;

    let supplementInputObj: ISupplementInputRequest | undefined = undefined;
    if (isSupplementInputEmpty) {
      this.supplement_input_information.markAsPristine();
      this.supplement_input_information.markAsUntouched();
    } else {
      supplementInputObj = {
        amount: supplementInputFields.amount,
        descriptionSupplementInput: supplementInputFields.descriptionSupplementInput,
        idSupplement: supplementInputFields.idSupplement,
      }
    }

    if (this.registrationDonationForm.invalid) {
      alert('Erro ao enviar formulário de cadastro de doação!');
      return;
    }

    this._donationsServices.postDonation({
      valueDonation: this.donation_information.value.valueDonation,
      description: this.donation_information.value.description,
      idUser: this.donation_information.value.idUser,
      idDonationCategory: this.donation_information.value.idDonationCategory,
      supplementInput: supplementInputObj ? supplementInputObj : undefined,
    }).pipe().subscribe({
      next: (response) => {
        alert('Doação cadastrada com sucesso!');
        this._router.navigate(['/home'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
