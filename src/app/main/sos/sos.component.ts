import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LocationService } from '@services/location.service';

@Component({
  selector: 'ng-sos',
  templateUrl: './sos.component.html',
  styleUrl: './sos.component.scss',
})
export class SosComponent implements AfterViewInit {
  @ViewChild('beep') beepAudio!: ElementRef<HTMLAudioElement>;

  message: string = 'Sending SOS';
  sosStatus: 'sent' | 'error' | 'sending' = 'sending';

  constructor(
    private location: Location,
    private loc: LocationService,
  ) {}

  async ngAfterViewInit() {
    const position = this.loc.getCurrent();
    // const [success, res] = await this.disaster.sos({
    //   location: position,
    //   userId: null,
    // });

    setTimeout(() => {
      this.sosStatus = 'sent';
      this.message = 'Sent SOS successfully!';

    }, 2000);
    // this.sosStatus = success ? 'sent' : 'error';
  }

  goBack() {
    this.location.back();
  }
}
