import { Component, HostBinding } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { BackdropService } from '@services/backdrop.service';

@Component({
  selector: 'ng-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @HostBinding('class') className = 'component mobile-opened';
  @HostBinding('class.mobile-opened') mobileOpened = false;

  authDone = false;

  constructor(
    private backdropService: BackdropService,
    private authService: AuthService
  ) {
    backdropService.backdropClicked$.subscribe(() => {
      this.backdropService.close();
      this.mobileOpened = false;
    });

    authService.currentUser$.subscribe((user) => {
      if (user) this.authDone = true;
      else this.authDone = false;
    });
  }

  openMenu() {
    this.mobileOpened = false;
    this.backdropService.open();
  }
}
