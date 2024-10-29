import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent {
  @Input({ required: true }) type: string = '';
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input() icon?: string;
}
