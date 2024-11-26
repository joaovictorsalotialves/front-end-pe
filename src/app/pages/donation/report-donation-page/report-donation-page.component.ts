import { Component, inject, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { InputFormComponent } from '../../../components/input-form/input-form.component';
import { IDonation } from '../../../interfaces/donations/donation.interface';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { DonationsService } from '../../../services/donations.service';
import { DonationsList } from '../../../types/donations-list';

@Component({
  selector: 'app-report-donation-page',
  templateUrl: './report-donation-page.component.html',
  styleUrls: ['./report-donation-page.component.scss']
})
export class ReportDonationPageComponent implements OnInit {
  userLogged = {} as IEmployee;

  donationsList: DonationsList = [];
  donationsByMonth: { [key: string]: number } = {};

  @ViewChild('inputStartDate') inputStartDate!: InputFormComponent;
  @ViewChild('inputEndDate') inputEndDate!: InputFormComponent;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: { text: 'Doações Por Mês' },
    series: [{
      type: 'line',
      data: []
    }]
  };

  private readonly _donationsService = inject(DonationsService);

  ngOnInit() {
    this.loadLast12MonthsData(); // Carregar dados dos últimos 12 meses inicialmente
  }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
  }

  // Carregar as doações dos últimos 12 meses
  loadLast12MonthsData(): void {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, 1); // 12 meses atrás
    const endDate = new Date(currentDate); // Hoje

    this.filterDonationList(startDate, endDate); // Filtra com o intervalo de 12 meses
  }

  filterDonationList(startDate?: Date, endDate?: Date): void {
    this._donationsService.getDonations().pipe().subscribe({
      next: (donationsList) => {
        if (donationsList) {
          const donationsByMonth: { [key: string]: number } = {};

          donationsList.forEach((donation: IDonation) => {
            if (donation.donationDate) {
              const donationDate = new Date(donation.donationDate);
              const monthKey = this.getMonthKey(donation.donationDate);

              // Filtra as doações dentro do intervalo de datas
              if (
                (!startDate || donationDate >= startDate) &&
                (!endDate || donationDate <= endDate)
              ) {
                donationsByMonth[monthKey] = (donationsByMonth[monthKey] || 0) + (donation.valueDonation || 0);
              }
            }
          });

          this.donationsByMonth = donationsByMonth;
          this.updateChart();
        }
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  private getMonthKey(date: string): string {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }

  private updateChart(): void {
    const months = Object.keys(this.donationsByMonth).sort();

    const chartData = months.map(month => ({
      name: month,
      y: this.donationsByMonth[month]
    }));

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const categories = months.map(monthKey => {
      const [year, month] = monthKey.split('-');
      return monthNames[parseInt(month, 10) - 1] + ' ' + year;
    });

    this.chartOptions = {
      title: { text: 'Doações Por Mês' },
      xAxis: {
        categories: categories,
        crosshair: true
      },
      series: [{
        type: 'line',
        data: chartData,
        name: 'Total de Doações'
      }]
    };
  }

  // Método para atualizar o gráfico com base nas datas selecionadas
  onDateRangeChange(): void {
    const startDate = this.inputStartDate.value ? new Date(this.inputStartDate.value) : undefined;
    const endDate = this.inputEndDate.value ? new Date(this.inputEndDate.value) : undefined;

    this.filterDonationList(startDate, endDate);
  }
}
