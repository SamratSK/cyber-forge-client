import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { BackdropService } from '@services/backdrop.service';

@Component({
  selector: 'ng-backdrop',
  standalone: false,

  templateUrl: './backdrop.component.html',
  styleUrl: './backdrop.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('200ms ease-out', style({ opacity: '1' })), // Scale to full size
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: '0' })), // Scale back to no size
      ]),
    ]),
  ],
})
export class BackdropComponent {
  opened = false;

  constructor(private backdropService: BackdropService) {
    backdropService.backdropOpened$.subscribe((state) => (this.opened = state));
  }

  clicked() {
    this.backdropService.backdropClicked$.next(undefined);
  }
}
