import { booleanAttribute, Component, Input } from '@angular/core';
import { CurrencyBRPipe } from '../../pipes/currency-br.pipe';

@Component({
  selector: 'app-card-report',
  templateUrl: './card-report.component.html',
  styleUrl: './card-report.component.scss',
  providers: [CurrencyBRPipe]
})
export class CardReportComponent {
  @Input({ required: true }) value: string = '';
  @Input({ required: true }) legend: string = '';
  @Input({ alias: 'currencyBr', transform: booleanAttribute }) isCurrencyBr: boolean = false;
}
