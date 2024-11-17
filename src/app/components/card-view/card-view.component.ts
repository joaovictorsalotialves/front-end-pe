import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss'
})
export class CardViewComponent {
  @Input({ required: true }) icon: string = '';
  @Input({ required: true }) item: { key: string; value: string | undefined | null; }[] = [];
  @Input({ required: true }) id: number | undefined;
  @Input({ required: true }) urlDetail: string = '/home';

  private readonly _router = inject(Router);

  onClick() {
    this._router.navigate([this.urlDetail + '/detail/', this.id]);
  }
}
