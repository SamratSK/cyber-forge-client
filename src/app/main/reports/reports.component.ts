import { Component } from '@angular/core';
import { DataService } from '@services/data.service';
import { LocationService } from '@services/location.service';
import * as L from 'leaflet';

@Component({
  selector: 'ng-reports',
  standalone: false,

  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  disasters: {
    disaster_type: string;
    name: string;
    latitude: number;
    longitude: number;
    description?: string;
    severity?: string;
    magnitude?: number;
    intensity?: string;
  }[] = [];
  map: L.Map | undefined;
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }),
    ],
    zoom: 5,
    center: L.latLng(20.5937, 78.9629),
  };

  layers: L.Marker[] = [];

  constructor(dataService: DataService, locService: LocationService) {
    const disasters = dataService.disasters;

    if (!disasters) return;

    const loc = locService.getCurrent();
    this.layers = [L.marker([loc.lat, loc.lon], {}).bindPopup('You are here')];

    this.disasters = disasters;
    for (let i = 0; i < disasters.length; i++) {
      const disaster = disasters[i];

      if (!isNaN(disaster.latitude) && !isNaN(disaster.longitude))
        this.layers.push(
          L.marker([disaster.latitude, disaster.longitude]).bindPopup(
            `${disaster.name}`
          )
        );
    }
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);
  }
}
