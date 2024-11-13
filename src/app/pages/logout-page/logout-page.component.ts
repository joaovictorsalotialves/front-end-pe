import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { IEmployee } from '../../interfaces/employees/employee.interface';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.scss'
})
export class LogoutPageComponent {
  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);

  logout(user: IEmployee) {
    this._employeesService.logoutEmployee(user.idEmployee).pipe(take(1)).subscribe({
      next: (logoutResponse) => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        this._router.navigate(['/login']);
      },
      error: (error) => {
        alert(error.message);
        this._router.navigate(['/home']);
      }
    });
  }
}
