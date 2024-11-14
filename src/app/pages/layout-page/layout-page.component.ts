import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { IEmployee } from '../../interfaces/employees/employee.interface';

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

  ngOnInit() {
    let userObjectString = localStorage.getItem('user');
    let authToken = localStorage.getItem('authToken');
    if (authToken && userObjectString) {
      let isTokenValid = this.isTokenExpired(authToken)
      if (!isTokenValid) {
        const user = JSON.parse(userObjectString) as IEmployee;
        this.userLogged = user;
        this.checkLoginEmitter.emit(user);
      } else {
        this._router.navigate(['/login']);
      }
    } else {
      this._router.navigate(['/login']);
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt_decode.jwtDecode<{ exp: number }>(token as string);
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
