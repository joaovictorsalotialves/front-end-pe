import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-button',
  templateUrl: './general-button.component.html',
  styleUrl: './general-button.component.scss'
})
export class GeneralButtonComponent {
  @Input({ required: true }) text: string = '';
}
