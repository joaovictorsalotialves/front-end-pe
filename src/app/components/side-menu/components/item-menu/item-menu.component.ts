import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrl: './item-menu.component.scss'
})
export class ItemMenuComponent {
  @Input({ required: true }) icon: string = '';
  @Input({ required: true }) title: string = '';
}
