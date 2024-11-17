import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployee } from '../../interfaces/employees/employee.interface';
import { ItensMenuMap } from '../../utils/itens-menu-map';

@Component({
  selector: 'app-side-menu-mobile',
  templateUrl: './side-menu-mobile.component.html',
  styleUrl: './side-menu-mobile.component.scss'
})
export class SideMenuMobileComponent extends ItensMenuMap {
  @Input({ required: true }) userLogged = {} as IEmployee;

  @Output('onClickMenuSideMobile') onClickMenuSideMobileEmitt = new EventEmitter<void>();

  onClickMenuSideMobile() {
    this.onClickMenuSideMobileEmitt.emit();
  }
}
