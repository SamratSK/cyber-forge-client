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

interface Update {
  id: number;
  type: string;
  msg: string;
}

interface Disaster {
  disaster_type: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  severity?: string;
  magnitude?: number;
  intensity?: string;
}

interface CityScore {
  city: string;
  total_score: number;
  facilities: {
    hospitals: number;
    police_station: number;
    fire_stations: number;
  };
  facilities_list: {
    name: string;
    lat: number;
    lon: number;
  }[];
  weakest_sector: {
    weakest_sector_name: string;
    facility_count: number;
    facilities: {
      name: string;
      lat: number;
      lon: number;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private BASE_URL = 'http://your-backend-url.com';

  // Global variables to store data
  public nearbyShelters: Shelter[] = [
    {
      name: 'Shelter A',
      latitude: 12.9716,
      longitude: 77.5946,
      capacity: '100',
    },
    {
      name: 'Shelter B',
      latitude: 12.9726,
      longitude: 77.5956,
      capacity: '150',
    },
  ];
  public firstAidKit: FirstAidKitResponse | null = {
    location: 'Bangalore',
    disaster_category: 'flood-prone',
    first_aid_kit: ['Bandages', 'Antiseptic', 'Pain relievers'],
  };
  public nearbyHospitals: Hospital[] = [
    {
      name: 'Hospital A',
      latitude: 12.9716,
      longitude: 77.5946,
      capacity: '50',
    },
    {
      name: 'Hospital B',
      latitude: 12.9726,
      longitude: 77.5956,
      capacity: '100',
    },
  ];
  public updates: Update[] = [
    { id: 1, type: 'Info', msg: 'Sample update message 1' },
    { id: 2, type: 'Warning', msg: 'Sample update message 2' },
  ];
  public disasters: Disaster[] = [
    {
      disaster_type: 'Storm',
      name: 'Cyclone XYZ',
      latitude: 15.9129,
      longitude: 79.74,
      description: 'Heavy storm expected',
      severity: 'High',
    },
    {
      disaster_type: 'Earthquake',
      name: 'Earthquake ABC',
      description: 'lorem ipusm',
      latitude: 28.7041,
      longitude: 77.1025,
      magnitude: 6.5,
    },
    {
      description: 'lorem ipusm',
      disaster_type: 'Wildfire',
      name: 'Wildfire DEF',
      latitude: 34.0522,
      longitude: -118.2437,
      intensity: 'Severe',
    },
  ];
  public cityScore: CityScore | null = {
    city: 'Springfield',
    total_score: 87,
    facilities: {
      hospitals: 5,
      police_station: 3,
      fire_stations: 2,
    },
    facilities_list: [
      {
        name: 'General Hospital',
        lat: 37.7749,
        lon: -122.4194,
      },
      {
        name: 'Central Police Station',
        lat: 37.779,
        lon: -122.4183,
      },
      {
        name: 'Downtown Fire Station',
        lat: 37.7786,
        lon: -122.4173,
      },
    ],
    weakest_sector: {
      weakest_sector_name: 'Education',
      facility_count: 1,
      facilities: {
        name: 'Central Library',
        lat: 37.775,
        lon: -122.4195,
      },
    },
  };

  constructor(private http: HttpClient) {}

  // Fetch and store nearby shelters
  async _getNearbyShelters(latitude: number, longitude: number): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.post<{ shelters: Shelter[] }>(
          `${this.BASE_URL}/nearby-shelters`,
          {
            latitude,
            longitude,
          }
        )
      );
      this.nearbyShelters = response.shelters || [];
    } catch (error) {
      console.error('Error fetching nearby shelters:', error);
      this.nearbyShelters = [];
    }
  }

  // Fetch and store disaster-prone category and first aid kit
  async _getFirstAidKit(location: string): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.post<FirstAidKitResponse>(`${this.BASE_URL}/first-aid-kit`, {
          location,
        })
      );
      this.firstAidKit = response || null;
    } catch (error) {
      console.error('Error fetching first aid kit:', error);
      this.firstAidKit = null;
    }
  }

  // Fetch and store nearby hospitals
  async _getNearbyHospitals(
    latitude: number,
    longitude: number
  ): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.post<{ hospitals: Hospital[] }>(
          `${this.BASE_URL}/nearby-hospitals`,
          {
            latitude,
            longitude,
          }
        )
      );
      this.nearbyHospitals = response.hospitals || [];
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
      this.nearbyHospitals = [];
    }
  }

  // Fetch and store updates
  async _getUpdates(): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.post<{ updates: Update[] }>(`${this.BASE_URL}/track`, {})
      );
      this.updates = response.updates || [];
    } catch (error) {
      console.error('Error fetching updates:', error);
      this.updates = [];
    }
  }

  // Fetch and store disasters
  async _getDisasters(): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.get<{ disasters: Disaster[] }>(
          `${this.BASE_URL}/get_disasters`
        )
      );
      this.disasters = response.disasters || [];
    } catch (error) {
      console.error('Error fetching disasters:', error);
      this.disasters = [];
    }
  }

  async _getCityScore(city: string): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.post<CityScore>(`${this.BASE_URL}/cityscore`, { city })
      );
      this.cityScore = response || null;
    } catch (error) {
      console.error('Error fetching city score:', error);
      this.cityScore = null;
    }
  }

  // Initialize and fetch all data
  async init(
    latitude: number,
    longitude: number,
    location: string
  ): Promise<void> {
    // await Promise.all([
    //   this._getNearbyShelters(latitude, longitude),
    //   this._getFirstAidKit(location),
    //   this._getNearbyHospitals(latitude, longitude),
    //   this._getUpdates(),
    //   this._getDisasters(),
    // ]);
  }
}
