import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { MenuItem } from '@interfaces/general.interfaces';
import { icons } from '@utils/icons.utils';

@Component({
  selector: 'ng-profile-icon',
  standalone: false,
  templateUrl: './profile-icon.component.html',
  styleUrl: './profile-icon.component.scss',
  animations: [
    trigger('scaleAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)' }), // Start with no scale
        animate('200ms ease-out', style({ transform: 'scale(1)' })), // Scale to full size
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0)' })), // Scale back to no size
      ]),
    ]),
  ],
})
export class ProfileIconComponent {
  @HostBinding('class') className = 'flx';

  @HostBinding('style.--p-height')
  @Input()
  height: string = '2.85em';

  @HostBinding('class.opened') opened = false;

  private clickListener: (event: Event) => void;

  constructor(private elRef: ElementRef) {
    this.clickListener = this.clickedOutside.bind(this);
  }

  items: MenuItem[] = [
    {
      icon: icons.user,
      name: 'Profile',
      action: () => {},
    },
    { icon: icons.signOut, name: 'Sign out', action: () => {} },
  ];

  toggle() {
    this.opened = !this.opened;

    if (this.opened) {
      document.addEventListener('click', this.clickListener);
    } else {
      document.removeEventListener('click', this.clickListener);
    }
  }

  clickedOutside(event: Event) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.opened = false;
      document.removeEventListener('click', this.clickListener); // Ensure listener is removed when toggled
    }
  }
}
