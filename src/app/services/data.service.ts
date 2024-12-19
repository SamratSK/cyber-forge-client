import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  BASE_URL = "";
  constructor(private http: HttpClient) {}

  async init() {
    await this._getResources();
  }
  
  private async _nearbyShelters() {
    try {
      const data = await lastValueFrom(this.http.get<any>(`${this.BASE_URL}`));
      // this.location = {
      //   lat: Number(data.latitude),
      //   lon: Number(data.longitude),
      // };
    } catch (error) {
      console.error('Error fetching geolocation data:', error);
    }
  }

  private async _getResources() {
    try {
      const data = await lastValueFrom(this.http.get<any>(`${this.BASE_URL}`));
      // this.location = {
      //   lat: Number(data.latitude),
      //   lon: Number(data.longitude),
      // };
    } catch (error) {
      console.error('Error fetching geolocation data:', error);
    }
  }
}
