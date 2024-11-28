import { Component, inject, OnInit } from '@angular/core';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { AnimalsService } from '../../../services/animals.service';
import { AnimalsList } from '../../../types/animals-list';

export interface IAnimal {
  idAnimal: number;
  nameAnimal: string;
  size: string;
  statusAnimal: string;
  description: string;
  idSpecies: number;
  nameSpecies: string;
  idRace: number;
  nameRace: string;
}

@Component({
  selector: 'app-report-animal-page',
  templateUrl: './report-animal-page.component.html',
  styleUrls: ['./report-animal-page.component.scss']
})
export class ReportAnimalPageComponent implements OnInit {
  userLogged = {} as IEmployee;

  animalsData: { [key: string]: { [key: string]: number } } = {};
  chartOptionsAnimals: any;

  isLoading = true;

  rescuedCount = 0;
  adoptedCount = 0;
  awaitingAdoptionCount = 0;
  inTreatmentCount = 0;
  inactiveCount = 0;

  private readonly _animalsService = inject(AnimalsService);

  ngOnInit() {
    this.loadAnimalData();
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
  }

  private loadAnimalData(): void {
    this._animalsService.getAnimals().subscribe({
      next: (animals) => {
        this.processAnimals(animals as AnimalsList);
        this.updateAnimalsChart();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading animal data:', err);
        this.isLoading = false;
      }
    });
  }

  private processAnimals(animalsList: AnimalsList): void {
    this.animalsData = {};

    this.rescuedCount = 0;
    this.adoptedCount = 0;
    this.awaitingAdoptionCount = 0;
    this.inTreatmentCount = 0;
    this.inactiveCount = 0;

    animalsList.forEach((animal: IAnimal) => {
      const status = animal.statusAnimal || 'Desconhecido';
      const race = animal.nameRace || 'Desconhecida';

      if (!this.animalsData[status]) {
        this.animalsData[status] = {};
      }

      if (!this.animalsData[status][race]) {
        this.animalsData[status][race] = 0;
      }

      this.animalsData[status][race] += 1;

      this.rescuedCount += 1;
      switch (status) {
        case 'ADOTADO':
          this.adoptedCount += 1;
          break;
        case 'AGUARDADO ADOÇÃO':
          this.awaitingAdoptionCount += 1;
          break;
        case 'EM TRATAMENTO':
          this.inTreatmentCount += 1;
          break;
        case 'INATIVO':
          this.inactiveCount += 1;
          break;
        default:
          break;
      }
    });
  }

  private updateAnimalsChart(): void {
    const chartData: { name: string, children: { name: string, value: number }[] }[] = [];

    Object.keys(this.animalsData).forEach(status => {
      const statusData = {
        name: status,
        children: [] as { name: string, value: number }[]
      };

      Object.keys(this.animalsData[status]).forEach(race => {
        statusData.children.push({
          name: race,
          value: this.animalsData[status][race]
        });
      });

      chartData.push(statusData);
    });

    this.chartOptionsAnimals = {
      title: {
        text: 'Quantidade de Animais por Status e Raça',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} animais'
      },
      series: [
        {
          type: 'treemap',
          data: chartData,
          label: {
            show: true,
            formatter: '{b}'
          },
          roam: true,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
            gapWidth: 1
          }
        }
      ]
    };
  }
}
