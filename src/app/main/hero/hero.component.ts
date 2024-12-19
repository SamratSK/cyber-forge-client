import { Component, HostBinding } from '@angular/core';
import { icons } from '@utils/icons.utils';

@Component({
  selector: 'ng-hero',
  standalone: false,
  
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @HostBinding('class') className = 'component flx--1';

  buttonIcons = {
    shelter: icons.shelter,
    resources: icons.resources,
    hospitals: icons.hospitals,
    contact: icons.contact,
    reports: icons.reports
  }
}
