import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployee } from '../../interfaces/employees/employee.interface';
import { ItensMenuMap } from '../../utils/itens-menu-map';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent extends ItensMenuMap {
  @Input({ required: true }) user = {} as IEmployee;

  @Output('onClickMenuSide') onClickMenuSideEmitt = new EventEmitter<void>();

  onClickMenuSide() {
    this.onClickMenuSideEmitt.emit();
  }
}
