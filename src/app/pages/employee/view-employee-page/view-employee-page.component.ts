import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { EmployeesService } from '../../../services/employees.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-employee-page',
  templateUrl: './view-employee-page.component.html',
  styleUrl: './view-employee-page.component.scss'
})
export class ViewEmployeePageComponent {
  userLogged = {} as IEmployee;

  employeesList: { id: number; values: { key: string; value: string | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    if (this.userLogged.position != 'Administrador') {
      alert('Usuario não possui permissão para acessar esse recurso!');
      this._router.navigate(['/home']);
    }
    this.filterEmployeesList();
  }

  filterEmployeesList(nameEmployee: string | undefined = undefined) {
    this._employeesService.getEmployees(nameEmployee).pipe().subscribe({
      next: (employeesList) => {
        const transformedEmployeesList = employeesList?.map((employee) => ({
          id: employee.idEmployee,
          values: [
            { key: 'Nome', value: employee.nameEmployee },
            { key: 'Email', value: employee.email },
            { key: 'Celular', value: employee.cellPhoneNumber },
            { key: 'Position', value: employee.position },
          ]
        }))
        this.employeesList = transformedEmployeesList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterEmployeesList(value);
  }
}
