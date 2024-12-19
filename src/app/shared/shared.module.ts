import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DialogComponent } from './dialog/dialog.component';
import { ProfileIconComponent } from './header/profile-icon/profile-icon.component';
import { DirectivesModule } from '@directives/directive.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackdropComponent } from './backdrop/backdrop.component';
import { RouterModule } from '@angular/router';

const components = [
  HeaderComponent,
  FooterComponent,
  DialogComponent,
  BackdropComponent,
];

@NgModule({
  declarations: [...components, ProfileIconComponent, BackdropComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  exports: [...components],
})
export class SharedModule {}
