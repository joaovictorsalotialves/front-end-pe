import { Component, OnInit } from '@angular/core';
import { DonationsService } from './services/donations.service';
import { EmployeesService } from './services/employees.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _employeesService: EmployeesService,
    private readonly _Service: DonationsService,
  ) { }

  ngOnInit() {
    this._employeesService.getEmployees().subscribe((employeesResponse) => {
      console.log(employeesResponse)
    });

    this._Service.deleteDonation(4).subscribe((response) => {
      console.log(response)
    });
  }
}
