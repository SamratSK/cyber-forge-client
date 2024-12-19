import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { SosComponent } from './sos/sos.component';


const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'sos', component: SosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
