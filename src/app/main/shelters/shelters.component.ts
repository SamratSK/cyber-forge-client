import { Component } from '@angular/core';
import { DataService } from '@services/data.service';
import { LocationService } from '@services/location.service';
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

  constructor(dataService: DataService, locService: LocationService) {
    const shelters = dataService.nearbyShelters;

    if (!shelters) return;

    const loc = locService.getCurrent();
    this.layers = [L.marker([loc.lat, loc.lon], {}).bindPopup('You are here')];

    for (let i = 0; i < shelters.length; i++) {
      const shelter = shelters[i];

      if (!isNaN(shelter.latitude) && !isNaN(shelter.longitude))
        this.layers.push(
          L.marker([shelter.latitude, shelter.longitude]).bindPopup(
            `${shelter.name} (Capacity: ${shelter.capacity})`
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
