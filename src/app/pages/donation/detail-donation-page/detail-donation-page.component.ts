import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDonation } from '../../../interfaces/donations/donation.interface';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { ISupplementInputRequest } from '../../../interfaces/supplement-inputs/supplement-input-request.interface';
import { DonationCategoriesService } from '../../../services/donation-categories.service';
import { DonationsService } from '../../../services/donations.service';
import { SupplementsService } from '../../../services/supplements.service';
import { UsersService } from '../../../services/users.service';
import { DetailDonationFormController } from './detail-donation-form-controller';

@Component({
  selector: 'app-detail-donation-page',
  templateUrl: './detail-donation-page.component.html',
  styleUrl: './detail-donation-page.component.scss'
})
export class DetailDonationPageComponent extends DetailDonationFormController implements OnInit {
  userLogged = {} as IEmployee;
  submitted = false;

  usersList: { id: number; value: string; }[] = [];
  donationCategoriesList: { id: number; value: string; }[] = [];
  supplementList: { id: number; value: string; }[] = [];

  donationDetail = {} as IDonation;
  donationId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _usersServices = inject(UsersService);
  private readonly _donationsServices = inject(DonationsService);
  private readonly _donationCategoriessServices = inject(DonationCategoriesService);
  private readonly _suppllementsServices = inject(SupplementsService);

  ngOnInit() {
    this.donationId = this._routerGet.snapshot.paramMap.get('idDonation');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    if (this.userLogged.position != 'Administrador') {
      alert('Usuario não possui permissão para acessar esse recurso!');
      this._router.navigate(['/home']);
    }
    this.getDonationDetail();
  }

  getDonationDetail() {
    if (this.donationId && !isNaN(Number(this.donationId))) {
      this._donationsServices.getDonation(Number(this.donationId)).pipe().subscribe({
        next: (donation) => {
          this.donationDetail = donation as IDonation;
          this.fulfillDetailDonationForm(this.donationDetail);
          this.filterUsersList(this.donationDetail.nameUser);
          this.filterDonationCategoriesList(this.donationDetail.nameDonationCategory);
          this.filterSupplementList(this.donationDetail.nameSupplement);
        },
        error: (error) => {
          alert(error);
          this._router.navigate(['/donations/view']);
        },
      });
    } else {
      alert('Não foi possivel visualizar essa doação');
      this._router.navigate(['/donations/view']);
    }
  }

  updateFormField(field: string, value: string) {
    this.detailDonationForm.patchValue({ [field]: value });
  }

  filterUsersList(nameUser: string | null | undefined = undefined) {
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

  filterSupplementList(nameSupplement: string | null | undefined = undefined) {
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

    console.log(this.detailDonationForm)

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

    if (this.detailDonationForm.invalid) {
      alert('Erro ao enviar formulário de edição da doação!');
      return;
    }

    this._donationsServices.putDonation(this.donationDetail.idDonation, {
      valueDonation: this.donation_information.value.valueDonation,
      description: this.donation_information.value.description,
      idUser: this.donation_information.value.idUser,
      idDonationCategory: this.donation_information.value.idDonationCategory,
      supplementInput: supplementInputObj ? supplementInputObj : undefined,
    }).pipe().subscribe({
      next: (response) => {
        alert('Doação atualizada com sucesso!');
        this._router.navigate(['/donations/view'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  del() {
    this._donationsServices.deleteDonation(Number(this.donationId)).pipe().subscribe({
      next: (response) => {
        alert('Doação deletado com sucesso!');
        this._router.navigate(['/donations/view']);
      },
      error: (error) => {
        alert(error);
      }
    });
  }
}
