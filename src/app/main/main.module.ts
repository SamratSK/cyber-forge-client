import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { MainRoutingModule } from './main-routing.module';
import { DirectivesModule } from '@directives/directive.module';

@NgModule({
  declarations: [HeroComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    DirectivesModule
  ]
})
export class MainModule { }
