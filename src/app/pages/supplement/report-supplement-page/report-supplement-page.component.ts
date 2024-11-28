import { Component, inject, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { IEmployee } from "../../../interfaces/employees/employee.interface";
import { SupplementCategoriesService } from "../../../services/supplement-categories.service";
import { SupplementInputsService } from "../../../services/supplement-inputs.service";
import { SupplementOutputsService } from "../../../services/supplement-outputs.service";
import { SupplementsService } from "../../../services/supplements.service";
import { SupplementInputsList } from "../../../types/supplement-inputs-list";
import { SupplementOutputsList } from "../../../types/supplement-outputs-list";
import { SupplementsList } from "../../../types/supplements-list";

@Component({
  selector: 'app-report-supplement-page',
  templateUrl: './report-supplement-page.component.html',
  styleUrls: ['./report-supplement-page.component.scss']
})
export class ReportSupplementPageComponent implements OnInit {
  userLogged = {} as IEmployee;

  supplementCategoriesList: { id: number; value: string }[] = [];
  idSupplementCategorySelect: number | undefined = undefined;

  supplementsData: { [key: string]: number } = {};
  supplementInputsData: { [supplementName: string]: { [monthYear: string]: number } } = {};
  supplementOutputsData: { [supplementName: string]: { [monthYear: string]: number } } = {};

  chartOptionsSupplements: any = {};
  chartOptionsInputs: any = {};  // For input data chart
  chartOptionsOutputs: any = {}; // For output data chart

  isLoading = false;

  private readonly _supplementsService = inject(SupplementsService);
  private readonly _supplementCategoriesServices = inject(SupplementCategoriesService);
  private readonly _supplementInputService = inject(SupplementInputsService);
  private readonly _supplementOutputService = inject(SupplementOutputsService);  // Serviço para obter as saídas

  ngOnInit(): void {
    this.filterSupplementCategoriesList();
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
  }

  filterSupplementCategoriesList(nameSupplementCategory: string | undefined = undefined): void {
    this._supplementCategoriesServices.getSupplementCategories(nameSupplementCategory).subscribe({
      next: (supplementCategoriesList) => {
        this.supplementCategoriesList = supplementCategoriesList?.map((category) => ({
          id: category.idSupplementCategory,
          value: category.nameSupplementCategory,
        })) || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  onSelectSupplementCategory(event: { id: string, value: string }): void {
    this.idSupplementCategorySelect = Number(event.id);
    this.loadSupplementData();
  }

  private loadSupplementData(): void {
    this.isLoading = true;

    forkJoin({
      supplements: this._supplementsService.getSupplements(),
      supplementInputs: this._supplementInputService.getSupplementInputs(),
      supplementOutputs: this._supplementOutputService.getSupplementOutputs()  // Nova chamada para obter as saídas
    }).subscribe({
      next: ({ supplements, supplementInputs, supplementOutputs }) => {
        this.processSupplements(supplements as SupplementsList);
        this.processSupplementInputs(supplementInputs as SupplementInputsList);
        this.processSupplementOutputs(supplementOutputs as SupplementOutputsList);  // Processar saídas
        this.updateSupplementsChart();
        this.updateSupplementInputsChart();
        this.updateSupplementOutputsChart();  // Atualizar gráfico de saídas
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading supplement data:', err);
        this.isLoading = false;
      }
    });
  }

  private processSupplements(supplements: SupplementsList): void {
    console.log("Supplements data:", supplements); // Adicionar log para depurar
    this.supplementsData = {};
    supplements.forEach(supplement => {
      if (supplement.idSupplementCategory === this.idSupplementCategorySelect) {
        const name = supplement.nameSupplement || 'Desconhecido';
        this.supplementsData[name] = (this.supplementsData[name] || 0) + supplement.stock;
      }
    });
    console.log("Processed supplementsData:", this.supplementsData); // Adicionar log para depurar
  }

  private processSupplementInputs(inputs: SupplementInputsList): void {
    console.log("Supplement inputs data:", inputs); // Adicionar log para depurar
    const now = new Date();
    const last12Months = new Set<string>();

    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last12Months.add(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`);
    }

    this.supplementInputsData = {};

    inputs.forEach(input => {
      if (input.idSupplementCategory === this.idSupplementCategorySelect) {
        const inputDate = new Date(input.inputDate);
        const monthYear = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}`;

        if (last12Months.has(monthYear)) {
          if (!this.supplementInputsData[input.nameSupplement]) {
            this.supplementInputsData[input.nameSupplement] = {};
          }

          this.supplementInputsData[input.nameSupplement][monthYear] =
            (this.supplementInputsData[input.nameSupplement][monthYear] || 0) + input.amount;
        }
      }
    });
    console.log("Processed supplementInputsData:", this.supplementInputsData); // Adicionar log para depurar
  }

  private processSupplementOutputs(outputs: SupplementOutputsList): void {
    console.log("Supplement outputs data:", outputs); // Log para depuração
    const now = new Date();
    const last12Months = new Set<string>();

    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last12Months.add(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`);
    }

    this.supplementOutputsData = {};

    outputs.forEach(output => {
      if (output.idSupplementCategory === this.idSupplementCategorySelect) {
        const outputDate = new Date(output.outputDate);
        const monthYear = `${outputDate.getFullYear()}-${(outputDate.getMonth() + 1).toString().padStart(2, '0')}`;

        if (last12Months.has(monthYear)) {
          if (!this.supplementOutputsData[output.nameSupplement]) {
            this.supplementOutputsData[output.nameSupplement] = {};
          }

          this.supplementOutputsData[output.nameSupplement][monthYear] =
            (this.supplementOutputsData[output.nameSupplement][monthYear] || 0) + output.amount;
        }
      }
    });
    console.log("Processed supplementOutputsData:", this.supplementOutputsData); // Log para depuração
  }

  private updateSupplementsChart(): void {
    const supplementNames = Object.keys(this.supplementsData);
    const stocks = Object.values(this.supplementsData);

    this.chartOptionsSupplements = {
      title: {
        text: 'Estoque de Suplementos por Categoria',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: '{b}: {c} unidades'
      },
      grid: {
        top: 60,
        bottom: 60,
        left: 120,
        right: 30,
        containLabel: true
      },
      xAxis: {
        type: 'value',
        name: 'Estoque (unidades)',
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: { show: true }
      },
      yAxis: {
        type: 'category',
        data: supplementNames,
        axisLabel: {
          interval: 0,
          formatter: (value: string) =>
            value.length > 15 ? value.slice(0, 15) + '...' : value,
        }
      },
      series: [
        {
          type: 'bar',
          data: stocks.map((stock, index) => ({
            value: stock,
            name: supplementNames[index]
          })),
          barWidth: '50%',
          itemStyle: {
            color: (params: any) => this.getColorForSupplement(supplementNames[params.dataIndex]),  // Usando a mesma cor para as barras
            borderRadius: [0, 5, 5, 0]
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}'
          }
        }
      ]
    };
  }

  private updateSupplementInputsChart(): void {
    const months = Array.from(new Set(Object.values(this.supplementInputsData).flatMap(inputData => Object.keys(inputData))));
    months.sort();

    const series = Object.keys(this.supplementInputsData).map(supplementName => {
      const amounts = months.map(month => this.supplementInputsData[supplementName][month] || 0);
      return {
        name: supplementName,
        type: 'line',
        data: amounts,
        smooth: true,
        itemStyle: {
          color: this.getColorForSupplement(supplementName)
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}'
        }
      };
    });

    this.chartOptionsInputs = {
      title: {
        text: 'Entradas de Suplementos por Mês',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        formatter: '{b}: {c} unidades'
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: {
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: 'Quantidade (unidades)',
        axisLabel: {
          formatter: '{value}'
        }
      },
      legend: {
        margin: 10, // Adiciona uma margem extra ao redor da legenda
        itemMarginTop: 10, // Distância entre os itens da legenda
        bottom: '0%',
        textStyle: {
          fontSize: 14
        }
      },
      series: series
    };
  }

  private updateSupplementOutputsChart(): void {
    const months = Array.from(new Set(Object.values(this.supplementOutputsData).flatMap(outputData => Object.keys(outputData))));
    months.sort();

    const series = Object.keys(this.supplementOutputsData).map(supplementName => {
      const amounts = months.map(month => this.supplementOutputsData[supplementName][month] || 0);
      return {
        name: supplementName,
        type: 'line',
        data: amounts,
        smooth: true,
        itemStyle: {
          color: this.getColorForSupplement(supplementName)
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}'
        }
      };
    });

    this.chartOptionsOutputs = {
      title: {
        text: 'Saídas de Suplementos por Mês',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        formatter: '{b}: {c} unidades'
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: {
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: 'Quantidade (unidades)',
        axisLabel: {
          formatter: '{value}'
        }
      },
      legend: {
        margin: 10, // Adiciona uma margem extra ao redor da legenda
        itemMarginTop: 10, // Distância entre os itens da legenda
        bottom: '0%',
        textStyle: {
          fontSize: 14
        }
      },
      series: series
    };
  }

  private getColorForSupplement(supplementName: string): string {
    const colors = ['#2196f3', '#4caf50', '#ff9800', '#f44336', '#9c27b0'];
    const index = supplementName.length % colors.length;
    return colors[index];
  }
}
