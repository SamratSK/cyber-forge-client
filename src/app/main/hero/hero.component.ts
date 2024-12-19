import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@services/data.service';
import { icons } from '@utils/icons.utils';
import * as L from 'leaflet';

@Component({
  selector: 'ng-hero',
  standalone: false,

  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  @HostBinding('class') className = 'component flx--1';
  dialogOpened = false;
  map: L.Map | undefined;

  score: {
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
  } | null = null;
  weakFacilities = '';

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  constructor(
    private router: Router,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  OPTS = {
    Contact: 'Contact',
    Reports: 'Reports',
    FirstAid: 'First Aid',
    Shelter: 'Shelter',
    Resources: 'Resources',
    Edu: 'Emergency Education',
  };

  selected = this.OPTS.Contact;

  buttonIcons = {
    shelter: icons.shelter,
    resources: icons.resources,
    hospitals: icons.hospitals,
    contact: icons.contact,
    reports: icons.reports,
  };

  select(value: string) {
    this.selected = value;
    this.dialog.nativeElement.showModal();
  }

  sos() {
    this.router.navigate(['/sos']);
  }

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
      this.score = this.dataService.cityScore;
      if (this.score) {
        for (let i = 0; i < this.score.facilities_list.length; i++) {
          const f = this.score.facilities_list[i];

          if (!isNaN(f.lat) && !isNaN(f.lon))
            this.layers.push(L.marker([f.lat, f.lon]).bindPopup(`${f.name}`));
        }
      }

      // this.weakFacilities =
      //   this.score?.weakest_sector.facilities.splice(0, 4).join(', ') || 'NA';
    }, 0);

    this.cdr.detectChanges();

    // if (
    //   this.score?.weakest_sector.facilities.length &&
    //   this.score?.weakest_sector.facilities.length <= 0
    // )
    //   this.score.weakest_sector.facilities = ['NA'];
  }
}
