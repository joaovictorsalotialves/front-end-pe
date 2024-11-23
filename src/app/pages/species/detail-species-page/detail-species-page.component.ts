import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { ISpecies } from '../../../interfaces/species/species.interface';
import { SpeciesService } from '../../../services/especies.service';
import { DetailSpeciesFormController } from './detail-species-form-controller';

@Component({
  selector: 'app-detail-species-page',
  templateUrl: './detail-species-page.component.html',
  styleUrl: './detail-species-page.component.scss'
})
export class DetailSpeciesPageComponent extends DetailSpeciesFormController {
  userLogged = {} as IEmployee;
  submitted = false;

  speciesDetail = {} as ISpecies;
  speciesId: string | null = null;

  private readonly _routerGet = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _speciesService = inject(SpeciesService);

  ngOnInit() {
    this.speciesId = this._routerGet.snapshot.paramMap.get('idSpecies');
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.getSpeciesDetail();
  }

  getSpeciesDetail() {
    if (this.speciesId && !isNaN(Number(this.speciesId))) {
      this._speciesService.getOneSpecies(Number(this.speciesId)).pipe().subscribe({
        next: (species) => {
          this.speciesDetail = species as ISpecies;
          this.fulfillDetailSpeciesForm(this.speciesDetail);
        },
        error: (error) => {
          alert(error);
          this._router.navigate(['/species/view']);
        },
      });
    } else {
      alert('Não foi possivel visualizar essa espécie!');
      this._router.navigate(['/species/view']);
    }
  }

  updateFormField(field: string, value: string) {
    this.detailSpeciesForm.patchValue({ [field]: value });
  }

  save() {
    this.submitted = true;
    if (this.detailSpeciesForm.invalid) {
      alert('Erro ao enviar formulário de edição de espécie!');
      return;
    }
    this._speciesService.putSpecies(this.speciesDetail.idSpecies, {
      nameSpecies: this.detailSpeciesForm.value.nameSpecies,
    }).pipe().subscribe({
      next: (response) => {
        alert('Espécie atualizada com sucesso!');
        this._router.navigate(['/species/view'])
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  del() {
    this._speciesService.deleteSpecies(Number(this.speciesId)).pipe().subscribe({
      next: (response) => {
        alert('Espécie deletada com sucesso!');
        this._router.navigate(['/species/view']);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
