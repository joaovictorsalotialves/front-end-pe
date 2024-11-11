import { Component, EventEmitter, Output } from '@angular/core';
import { ItensMenuMap } from '../../utils/itens-menu-map';

@Component({
  selector: 'app-side-menu-mobile',
  templateUrl: './side-menu-mobile.component.html',
  styleUrl: './side-menu-mobile.component.scss'
})
export class SideMenuMobileComponent extends ItensMenuMap {
  @Output('onClickMenuSideMobile') onClickMenuSideMobileEmitt = new EventEmitter<void>();

  onClickMenuSideMobile() {
    this.onClickMenuSideMobileEmitt.emit();
  }
}
