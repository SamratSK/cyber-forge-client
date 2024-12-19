import { NgModule } from '@angular/core';
import { SvgToDataDirective } from './svg-to-data.directive';
import { SvgFromDataDirective } from './svg-from-data.directive';

const directives = [SvgToDataDirective, SvgFromDataDirective];

@NgModule({
  imports: [],
  declarations: [...directives],
  exports: [...directives]
})
export class DirectivesModule { }