import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { IEmployee } from '../../interfaces/employees/employee.interface';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent implements OnInit {
  toggleMenu = true;
  userLogged = {} as IEmployee;

  @Output('checkLogin') checkLoginEmitter = new EventEmitter<IEmployee>();

  private readonly _router = inject(Router);
  private readonly _employeesService = inject(EmployeesService);

  ngOnInit() {
    let userObjectString = localStorage.getItem('user');
    let authToken = localStorage.getItem('authToken');
    if (authToken && userObjectString) {
      let isTokenValid = this.isTokenExpired(authToken)
      if (!isTokenValid) {
        const user = JSON.parse(userObjectString) as IEmployee;
        this.updateUserLogged(user.idEmployee);
      } else {
        this._router.navigate(['/login']);
      }
    } else {
      this._router.navigate(['/login']);
    }
  }

  updateUserLogged(idEmployee: number) {
    this._employeesService.getEmployee(Number(idEmployee)).pipe().subscribe({
      next: (employee) => {
        this.userLogged = employee as IEmployee;
        this.checkLoginEmitter.emit(this.userLogged);
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt_decode.jwtDecode<{ exp: number }>(token);
      if (decoded.exp === undefined) return false;

      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Token inválido", error);
      return true;
    }
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }
}
