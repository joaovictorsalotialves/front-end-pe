import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { InputFormComponent } from "../../../components/input-form/input-form.component";
import { IEmployee } from "../../../interfaces/employees/employee.interface";
import { DonationsService } from "../../../services/donations.service";
import { DonationsList } from "../../../types/donations-list";

@Component({
  selector: 'app-report-donation-page',
  templateUrl: './report-donation-page.component.html',
  styleUrls: ['./report-donation-page.component.scss']
})
export class ReportDonationPageComponent implements OnInit {
  @ViewChild('inputStartDate') inputStartDate!: InputFormComponent;
  @ViewChild('inputEndDate') inputEndDate!: InputFormComponent;

  userLogged = {} as IEmployee;

  supplementsData: { [key: string]: { [supplementName: string]: number } } = {};
  donationsByMonth: { [key: string]: number } = {};

  valueDonationTotal: number = 0;
  donationCount: number = 0;

  donationCountSupplement: number = 0;

  chartOptionsSupplements: any;
  chartOptionsDonations: any;

  isLoading = true;

  private readonly _donationsService = inject(DonationsService);

  ngOnInit() {
    this.loadLast12MonthsData();
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
  }

  loadLast12MonthsData(): void {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, 1);
    const endDate = new Date(currentDate);

    this.loadFilteredData(startDate, endDate);
  }

  onDateRangeChange(): void {
    const startDate = this.inputStartDate.value ? new Date(this.inputStartDate.value) : undefined;
    const endDate = this.inputEndDate.value ? new Date(this.inputEndDate.value) : undefined;

    if (startDate && endDate) {
      this.isLoading = true;
      this.loadFilteredData(startDate, endDate);
    }
  }

  private loadFilteredData(startDate: Date, endDate: Date): void {
    this._donationsService.getDonations().subscribe({
      next: (donations) => {
        this.processDonations(donations as DonationsList, startDate, endDate);
        this.updateCharts();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading donations:', err);
        this.isLoading = false;
      }
    });
  }

  private processDonations(donationsList: DonationsList, startDate: Date, endDate: Date): void {
    this.supplementsData = {};
    this.donationsByMonth = {};

    this.valueDonationTotal = 0;
    this.donationCount = 0;
    this.donationCountSupplement = 0;

    donationsList.forEach(donation => {
      if (donation.donationDate) {
        const donationDate = new Date(donation.donationDate);
        const monthKey = this.getMonthKey(donation.donationDate);

        if (donationDate >= startDate && donationDate <= endDate) {
          if (donation.nameSupplement && donation.amount) {
            if (!this.supplementsData[monthKey]) {
              this.supplementsData[monthKey] = {};
            }
            this.supplementsData[monthKey][donation.nameSupplement] =
              (this.supplementsData[monthKey][donation.nameSupplement] || 0) + donation.amount;
            this.donationCountSupplement += 1;
          }

          if (donation.valueDonation) {
            this.donationsByMonth[monthKey] =
              (this.donationsByMonth[monthKey] || 0) + donation.valueDonation;
            this.valueDonationTotal += donation.valueDonation;
            this.donationCount++;
          }
        }
      }
    });
  }

  private getMonthKey(date: string): string {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }

  private updateCharts(): void {
    this.updateSupplementsChart();
    this.updateDonationsChart();
  }

  private updateSupplementsChart(): void {
    const months = Object.keys(this.supplementsData).sort();
    const supplementNames = Array.from(
      new Set(
        months.flatMap(month => Object.keys(this.supplementsData[month]))
      )
    );

    const seriesData = supplementNames.map(supplementName => {
      return {
        name: supplementName,
        type: 'line',
        data: months.map(month => this.supplementsData[month][supplementName] || 0)
      };
    });

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const categories = months.map(monthKey => {
      const [year, month] = monthKey.split('-');
      return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
    });

    this.chartOptionsSupplements = {
      title: {
        text: 'Entradas de Insumos por Mês',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' }
      },
      xAxis: {
        type: 'category',
        data: categories,
        name: 'Mês'
      },
      yAxis: {
        type: 'value',
        name: 'Quantidade'
      },
      series: seriesData
    };
  }

  private updateDonationsChart(): void {
    const months = Object.keys(this.donationsByMonth).sort();

    const donationsData = months.map(month => this.donationsByMonth[month] || 0);

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const categories = months.map(monthKey => {
      const [year, month] = monthKey.split('-');
      return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
    });

    this.chartOptionsDonations = {
      title: {
        text: 'Valores de Doações Por Mês',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      xAxis: {
        type: 'category',
        data: categories,
        name: 'Mês'
      },
      yAxis: {
        type: 'value',
        name: 'Valor (R$)'
      },
      series: [
        {
          name: 'Doações',
          type: 'bar',
          data: donationsData,
          color: '#003366'
        }
      ]
    };
  }
}
