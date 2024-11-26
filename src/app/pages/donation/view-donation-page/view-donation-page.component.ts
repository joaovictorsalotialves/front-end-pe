import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { DatePipe } from '../../../pipes/date.pipe';
import { DonationsService } from '../../../services/donations.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-donation-page',
  templateUrl: './view-donation-page.component.html',
  styleUrl: './view-donation-page.component.scss',
  providers: [DatePipe]
})
export class ViewDonationPageComponent {
  userLogged = {} as IEmployee;

  donationsList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _donationsService = inject(DonationsService);

  constructor(private datePipe: DatePipe) { }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterDonationList();
  }

  filterDonationList(nameDonation: string | undefined = undefined) {
    this._donationsService.getDonations(nameDonation).pipe().subscribe({
      next: (donationsList) => {
        const transformedDonationList = donationsList?.map((donation) => ({
          id: donation.idDonation,
          values: [
            { key: 'Nome do Doador', value: donation.nameUser },
            { key: 'Categoria', value: donation.nameDonationCategory },
            { key: 'Data da Doação', value: this.datePipe.transform(donation.donationDate) },
          ]
        }))
        this.donationsList = transformedDonationList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterDonationList(value);
  }
}
