import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'ng-shelters',
  standalone: false,

  templateUrl: './shelters.component.html',
  styleUrl: './shelters.component.scss',
})
export class SheltersComponent {
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

  onMapReady(map: L.Map) {
    this.map = map;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);
  }
}
