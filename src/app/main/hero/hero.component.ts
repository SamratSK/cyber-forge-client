import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { icons } from '@utils/icons.utils';

@Component({
  selector: 'ng-hero',
  standalone: false,
  
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @HostBinding('class') className = 'component flx--1';
  dialogOpened = false;


  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  constructor(private router: Router) {}

  OPTS = {
    Contact: 'Contact',
    Reports: 'Reports',
    FirstAid: 'First Aid',
    Shelter: 'Shelter',
    Resources: 'Resources',
    Edu: 'Emergency Education',
}

  selected = this.OPTS.Contact

  buttonIcons = {
    shelter: icons.shelter,
    resources: icons.resources,
    hospitals: icons.hospitals,
    contact: icons.contact,
    reports: icons.reports
  }

  select(value: string) {
    this.selected = value;
    this.dialog.nativeElement.showModal();
  }

  sos() {
    this.router.navigate(['/sos']);
  }
}
