import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdoption } from '../../../interfaces/adoptions/adoption.interface';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { AdoptionsService } from '../../../services/adoptions.service';
import { AnimalsService } from '../../../services/animals.service';
import { UsersService } from '../../../services/users.service';
import { STATUS_ADOPTION_MAP } from '../../../utils/status-adoption-map';
import { DetailAdoptionFormController } from './detail-adoption-form-controller';

@Component({
  selector: 'app-detail-adoption-page',
  templateUrl: './detail-adoption-page.component.html',
  styleUrl: './detail-adoption-page.component.scss'
})
export class DetailAdoptionPageComponent extends DetailAdoptionFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  animalsList: { id: number; value: string; }[] = []
  usersList: { id: number; value: string; }[] = []
  statusAdoptionList = STATUS_ADOPTION_MAP;

  adoptionDetail = {} as IAdoption;
  adoptionId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _adoptionsService = inject(AdoptionsService);
  private readonly _animalsService = inject(AnimalsService);
  private readonly _usersServices = inject(UsersService);

  ngOnInit() {
    this.adoptionId = this._routerGet.snapshot.paramMap.get('idAdoption');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getAdoptionDetail();
  }

  filterAnimalList(nameAnimal: string | undefined = undefined) {
    this._animalsService.getAnimals(nameAnimal).pipe().subscribe({
      next: (animalsList) => {
        const transformedAnimalsList = animalsList?.map((animal) => ({
          id: animal.idAnimal,
          value: animal.nameAnimal + ' - ' + animal.nameRace
        }))
        this.animalsList = transformedAnimalsList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
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

  onSelectAnimal(event: { id: string, value: string }) {
    this.detailAdoptionForm.patchValue({ 'nameAnimal': event.value });
    this.detailAdoptionForm.patchValue({ 'idAnimal': event.id });
  }

  onSelectUser(event: { id: string, value: string }) {
    this.detailAdoptionForm.patchValue({ 'nameUser': event.value });
    this.detailAdoptionForm.patchValue({ 'idUser': event.id });
  }

  onSelectStatusAdoption(event: { id: string, value: string }) {
    this.detailAdoptionForm.patchValue({ 'statusAdoption': event.value });
  }

  getAdoptionDetail() {
    if (this.adoptionId && !isNaN(Number(this.adoptionId))) {
      this._adoptionsService.getAdoption(Number(this.adoptionId)).pipe().subscribe({
        next: (adoption) => {
          this.adoptionDetail = adoption as IAdoption;
          this.fulfillDetailAdoptionForm(this.adoptionDetail);
          this.filterAnimalList(this.adoptionDetail.nameAnimal);
          this.filterUsersList(this.adoptionDetail.nameUser);
        },
        error: (error) => {
          alert(error);
          this._router.navigate(['/adoptions/view']);
        },
      });
    } else {
      alert('Não foi possivel visualizar essa adoção!');
      this._router.navigate(['/adoptions/view']);
    }
  }

  updateFormField(field: string, value: string) {
    this.detailAdoptionForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.detailAdoptionForm.invalid) {
      alert('Erro ao enviar formulário de edição de adoção!');
      return;
    }
    this._adoptionsService.putAdoption(this.adoptionDetail.idAdoption, {
      idAnimal: this.detailAdoptionForm.value.idAnimal,
      idUser: this.detailAdoptionForm.value.idUser,
      statusAdoption: this.detailAdoptionForm.value.statusAdoption,
    }).pipe().subscribe({
      next: (response) => {
        alert('Adoção atualizada com sucesso!');
        this._router.navigate(['/adoptions/view'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  del() {
    this._adoptionsService.deleteAdoption(Number(this.adoptionId)).pipe().subscribe({
      next: (response) => {
        alert('Adoção deletada com sucesso!');
        this._router.navigate(['/adoptions/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
