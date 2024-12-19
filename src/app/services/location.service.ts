import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}


  private readonly GEO_URL = 'https://get.geojs.io/v1/ip/geo.json';

  private location: { lat: number; lon: number } | null = null;

  async init() {
    await this._getCurrentLocation();
  }

  getCurrent(): { lat: number; lon: number } {
    if (this.location) return this.location;
    else throw new Error('Location service not initialized');
  }

  private async _getCurrentLocation() {
    try {
      const data = await lastValueFrom(this.http.get<any>(this.GEO_URL));
      this.location = {
        lat: Number(data.latitude),
        lon: Number(data.longitude),
      };
    } catch (error) {
      console.error('Error fetching geolocation data:', error);
    }
  }
}
