// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { lastValueFrom } from 'rxjs';

// interface Shelter {
//   name: string;
//   latitude: number;
//   longitude: number;
//   capacity: string;
// }

// interface Hospital {
//   name: string;
//   latitude: number;
//   longitude: number;
//   capacity: string;
// }

// interface FirstAidKitResponse {
//   location: string;
//   disaster_category: string;
//   first_aid_kit: any;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class DataService {
//   private BASE_URL = 'http://your-backend-url.com';

//   // Global variables to store data
//   public nearbyShelters: Shelter[] = [];
//   public firstAidKit: FirstAidKitResponse | null = null;
//   public nearbyHospitals: Hospital[] = [];

//   constructor(private http: HttpClient) {}

//   // Fetch and store nearby shelters
//   async _getNearbyShelters(latitude: number, longitude: number): Promise<void> {
//     try {
//       const response = await lastValueFrom(
//         this.http.post<{ shelters: Shelter[] }>(`${this.BASE_URL}/nearby-shelters`, {
//           latitude,
//           longitude,
//         })
//       );
//       this.nearbyShelters = response.shelters || [];
//     } catch (error) {
//       console.error('Error fetching nearby shelters:', error);
//       this.nearbyShelters = [];
//     }
//   }

//   // Fetch and store disaster-prone category and first aid kit
//   async _getFirstAidKit(location: string): Promise<void> {
//     try {
//       const response = await lastValueFrom(
//         this.http.post<FirstAidKitResponse>(`${this.BASE_URL}/first-aid-kit`, {
//           location,
//         })
//       );
//       this.firstAidKit = response || null;
//     } catch (error) {
//       console.error('Error fetching first aid kit:', error);
//       this.firstAidKit = null;
//     }
//   }

//   // Fetch and store nearby hospitals
//   async _getNearbyHospitals(latitude: number, longitude: number): Promise<void> {
//     try {
//       const response = await lastValueFrom(
//         this.http.post<{ hospitals: Hospital[] }>(`${this.BASE_URL}/nearby-hospitals`, {
//           latitude,
//           longitude,
//         })
//       );
//       this.nearbyHospitals = response.hospitals || [];
//     } catch (error) {
//       console.error('Error fetching nearby hospitals:', error);
//       this.nearbyHospitals = [];
//     }
//   }

//   // Initialize and fetch all data
//   async init(latitude: number, longitude: number, location: string): Promise<void> {
//     await Promise.all([
//       this._getNearbyShelters(latitude, longitude),
//       this._getFirstAidKit(location),
//       this._getNearbyHospitals(latitude, longitude),
//     ]);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface Shelter {
  name: string;
  latitude: number;
  longitude: number;
  capacity: string;
}

interface Hospital {
  name: string;
  latitude: number;
  longitude: number;
  capacity: string;
}

interface FirstAidKitResponse {
  location: string;
  disaster_category: string;
  first_aid_kit: any;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private BASE_URL = 'http://your-backend-url.com';

  // Global variables to store data
  public nearbyShelters: Shelter[] = [];
  public firstAidKit: FirstAidKitResponse | null = null;
  public nearbyHospitals: Hospital[] = [];

  constructor(private http: HttpClient) {}

  // Fetch and store nearby shelters
  async _getNearbyShelters(latitude: number, longitude: number): Promise<void> {
    this.nearbyShelters = [
      { name: 'Shelter A', latitude: latitude, longitude: longitude, capacity: '100' },
      { name: 'Shelter B', latitude: latitude + 0.01, longitude: longitude + 0.01, capacity: '200' },
    ];
  }

  // Fetch and store disaster-prone category and first aid kit
  async _getFirstAidKit(location: string): Promise<void> {
    this.firstAidKit = {
      location: location,
      disaster_category: 'flood-prone',
      first_aid_kit: ['Bandages', 'Antiseptic', 'Pain relievers'],
    };
  }

  // Fetch and store nearby hospitals
  async _getNearbyHospitals(latitude: number, longitude: number): Promise<void> {
    this.nearbyHospitals = [
      { name: 'Hospital A', latitude: latitude, longitude: longitude, capacity: '50' },
      { name: 'Hospital B', latitude: latitude + 0.02, longitude: longitude + 0.02, capacity: '100' },
    ];
  }

  // Initialize and fetch all data
  async init(latitude: number, longitude: number, location: string): Promise<void> {
    await Promise.all([
      this._getNearbyShelters(latitude, longitude),
      this._getFirstAidKit(location),
      this._getNearbyHospitals(latitude, longitude),
    ]);
  }
}

