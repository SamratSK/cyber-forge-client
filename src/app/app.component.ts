import { Component, HostBinding, OnInit } from '@angular/core';
import { LocationService } from '@services/location.service';

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = 'flx--1 component';

  constructor(private locService: LocationService) {}

  async ngOnInit() {
    await this.locService.init();
  }
}
