import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-menu-mobile',
  templateUrl: './item-menu-mobile.component.html',
  styleUrl: './item-menu-mobile.component.scss'
})
export class ItemMenuMobileComponent {
  @Input({ required: true }) icon: string = '';
}
