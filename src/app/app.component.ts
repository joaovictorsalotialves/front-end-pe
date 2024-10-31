import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './services/employees.service';
import { SupplementOutputsService } from './services/supplement-outputs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _employeesService: EmployeesService,
    private readonly _Service: SupplementOutputsService,
  ) { }

  ngOnInit() {
    this._employeesService.getEmployees().subscribe((employeesResponse) => {
      console.log(employeesResponse)
    });

    this._Service.deleteSupplementOutput(2).subscribe((response) => {
      console.log(response)
    });
  }
}
