import { Component, HostBinding, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { LocationService } from '@services/location.service';

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = 'flx--1 component';

  constructor(private locService: LocationService, private dataService: DataService) {}

  async ngOnInit() {
    await this.locService.init();

    const loc = this.locService.getCurrent();
    await this.dataService.init(loc.lat, loc.lon, 'bengaluru');
  }
}
