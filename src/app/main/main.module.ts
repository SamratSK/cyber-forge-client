import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { MainRoutingModule } from './main-routing.module';
import { DirectivesModule } from '@directives/directive.module';
import { FirstAidComponent } from './first-aid/first-aid.component';
import { ResourcesComponent } from './resources/resources.component';
import { SheltersComponent } from './shelters/shelters.component';
import { ContactComponent } from './contact/contact.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [HeroComponent, FirstAidComponent, ResourcesComponent, SheltersComponent, ContactComponent, ReportsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    DirectivesModule,
    LeafletModule
  ]
})
export class MainModule { }
