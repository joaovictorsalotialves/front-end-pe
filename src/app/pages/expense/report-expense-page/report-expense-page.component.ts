import { Component, inject, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { InputFormComponent } from '../../../components/input-form/input-form.component';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { CurrencyBRPipe } from '../../../pipes/currency-br.pipe';
import { DonationsService } from '../../../services/donations.service';
import { ExpensesService } from '../../../services/expenses.service';
import { DonationsList } from '../../../types/donations-list';
import { ExpensesList } from '../../../types/expenses-list';

@Component({
  selector: 'app-report-expense-page',
  templateUrl: './report-expense-page.component.html',
  styleUrl: './report-expense-page.component.scss',
  providers: [CurrencyBRPipe]
})
export class ReportExpensePageComponent {
  @ViewChild('inputStartDate') inputStartDate!: InputFormComponent;
  @ViewChild('inputEndDate') inputEndDate!: InputFormComponent;

  userLogged = {} as IEmployee;

  donationsByMonth: { [key: string]: number } = {};
  expensesByMonth: { [key: string]: number } = {};
  expensesPaidByMonth: { [key: string]: number } = {};
  expensesUnpaidByMonth: { [key: string]: number } = {};
  expensesLateByMonth: { [key: string]: number } = {};

  totalDonations: number = 0;
  totalExpenses: number = 0;
  totalPaidExpenses: number = 0;
  totalUnpaidExpenses: number = 0;
  totalLateExpenses: number = 0;
  profit: number = 0;

  chartOptions: any;
  isLoading = true;

  private readonly _donationsService = inject(DonationsService);
  private readonly _expensesService = inject(ExpensesService);

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
    forkJoin({
      donations: this._donationsService.getDonations(),
      expenses: this._expensesService.getExpenses()
    }).subscribe({
      next: ({ donations, expenses }) => {
        this.processDonations(donations as DonationsList, startDate, endDate);
        this.processExpenses(expenses as ExpensesList, startDate, endDate);
        this.updateChart();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
      }
    });
  }

  private processDonations(donationsList: DonationsList, startDate: Date, endDate: Date): void {
    this.donationsByMonth = {};
    this.totalDonations = 0;
    donationsList.forEach(donation => {
      if (donation.donationDate) {
        const donationDate = new Date(donation.donationDate);
        const monthKey = this.getMonthKey(donation.donationDate);

        if (donationDate >= startDate && donationDate <= endDate) {
          this.donationsByMonth[monthKey] =
            (this.donationsByMonth[monthKey] || 0) + (donation.valueDonation || 0);
          this.totalDonations += donation.valueDonation || 0;
        }
      }
    });
  }

  private processExpenses(expensesList: ExpensesList, startDate: Date, endDate: Date): void {
    this.expensesByMonth = {};
    this.expensesPaidByMonth = {};
    this.expensesUnpaidByMonth = {};
    this.expensesLateByMonth = {};

    this.totalExpenses = 0;
    this.totalPaidExpenses = 0;
    this.totalUnpaidExpenses = 0;
    this.totalLateExpenses = 0;

    expensesList.forEach(expense => {
      if (expense.dueDate) {
        const dueDate = new Date(expense.dueDate);
        const monthKey = this.getMonthKey(expense.dueDate);

        if (dueDate >= startDate && dueDate <= endDate) {
          const valueExpense = expense.valueExpense;
          const statusExpense = expense.statusExpense;

          this.expensesByMonth[monthKey] = (this.expensesByMonth[monthKey] || 0) + valueExpense;
          this.totalExpenses += valueExpense;

          if (statusExpense === 'Paga') {
            this.expensesPaidByMonth[monthKey] = (this.expensesPaidByMonth[monthKey] || 0) + valueExpense;
            this.totalPaidExpenses += valueExpense;
          } else if (statusExpense === 'Não Paga') {
            this.expensesUnpaidByMonth[monthKey] = (this.expensesUnpaidByMonth[monthKey] || 0) + valueExpense;
            this.totalUnpaidExpenses += valueExpense;
          } else if (statusExpense === 'Atrasada') {
            this.expensesLateByMonth[monthKey] = (this.expensesLateByMonth[monthKey] || 0) + valueExpense;
            this.totalLateExpenses += valueExpense;
          }
        }
      }
    });

    this.profit = this.totalDonations - this.totalExpenses;
  }

  private getMonthKey(date: string): string {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }

  private updateChart(): void {
    const months = Array.from(
      new Set([
        ...Object.keys(this.donationsByMonth),
        ...Object.keys(this.expensesByMonth),
        ...Object.keys(this.expensesPaidByMonth),
        ...Object.keys(this.expensesUnpaidByMonth),
        ...Object.keys(this.expensesLateByMonth)
      ])
    ).sort();

    const donationsData = months.map(month => this.donationsByMonth[month] || 0);
    const expensesData = months.map(month => this.expensesByMonth[month] || 0);
    const expensesPaidData = months.map(month => this.expensesPaidByMonth[month] || 0);
    const expensesUnpaidData = months.map(month => this.expensesUnpaidByMonth[month] || 0);
    const expensesLateData = months.map(month => this.expensesLateByMonth[month] || 0);

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const categories = months.map(monthKey => {
      const [year, month] = monthKey.split('-');
      return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
    });

    this.chartOptions = {
      title: {
        text: 'Doações e Despesas Por Mês',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        margin: 10, // Adiciona uma margem extra ao redor da legenda
        itemMarginTop: 10, // Distância entre os itens da legenda
        bottom: '0%',
        data: ['Doações', 'Despesas Totais', 'Despesas Pagas', 'Despesas Não Pagas', 'Despesas Atrasadas'],
      },
      xAxis: {
        type: 'category',
        data: categories,
      },
      yAxis: {
        type: 'value',
        name: 'Valor (R$)'
      },
      series: [
        {
          name: 'Doações',
          type: 'line',
          data: donationsData,
          color: '#003366'
        },
        {
          name: 'Despesas Totais',
          type: 'line',
          data: expensesData,
          color: '#6f42c1'
        },
        {
          name: 'Despesas Pagas',
          type: 'line',
          data: expensesPaidData,
          color: '#28a745'
        },
        {
          name: 'Despesas Não Pagas',
          type: 'line',
          data: expensesUnpaidData,
          color: '#ffc107'
        },
        {
          name: 'Despesas Atrasadas',
          type: 'line',
          data: expensesLateData,
          color: '#dc3545'
        }
      ]
    };
  }
}
