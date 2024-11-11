import { Component } from '@angular/core';
import { IEmployee } from '../../interfaces/employees/employee.interface';
import { ItensMenuMap } from '../../utils/itens-menu-map';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent extends ItensMenuMap {
  userLogged = {} as IEmployee;

  checkLogin(user: IEmployee) {
    this.userLogged = user;
  }
}
