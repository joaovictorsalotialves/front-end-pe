import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-flow-header',
  templateUrl: './auth-flow-header.component.html',
  styleUrl: './auth-flow-header.component.scss'
})
export class AuthFlowHeaderComponent {
  @Input({ required: true }) text: string = '';
}
