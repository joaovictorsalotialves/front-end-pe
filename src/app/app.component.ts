import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './services/employees.service';
import { SpeciesService } from './services/especies.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _employeesService: EmployeesService,
    private readonly _especiesService: SpeciesService,
  ) { }

  ngOnInit() {
    this._usersService.getUsers().subscribe((usersResponse) => {
      console.log(usersResponse)
    });

    this._employeesService.getEmployees().subscribe((employeesResponse) => {
      console.log(employeesResponse)
    });

    this._especiesService.deleteSpecies(2).subscribe((response) => {
      console.log(response)
    });
  }
}
