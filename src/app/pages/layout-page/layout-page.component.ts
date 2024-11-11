import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    if (userObjectString) {
      const user = JSON.parse(userObjectString) as IEmployee;
      this.userLogged = user;
      this.checkLoginEmitter.emit(user);
    } else {
      this._router.navigate(['/login']);
    };
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }
}
