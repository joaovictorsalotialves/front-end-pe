import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-section-menu',
  templateUrl: './title-section-menu.component.html',
  styleUrl: './title-section-menu.component.scss'
})
export class TitleSectionMenuComponent {
  @Input({ required: true }) title: string = '';
}
