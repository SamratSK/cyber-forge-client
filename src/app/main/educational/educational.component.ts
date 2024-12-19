import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '@services/data.service';

@Component({
  selector: 'ng-educational',
  standalone: false,

  templateUrl: './educational.component.html',
  styleUrl: './educational.component.scss',
})
export class EducationalComponent {
  links: { name: string; link: string }[] = [
    {
      name: 'Disasters',
      link: 'http://www.maginnow.com/1.mp4',
    },
    {
      name: 'Tornado',
      link: 'http://www.maginnow.com/2.mp4',
    },
  ];

  selectedIndex: number = -1;

  summary = 'Generating...';
  transsummary = 'Generating...';

  constructor(public dom: DomSanitizer, private dataService: DataService) {}

  clicked(index: number) {
    this.selectedIndex = index;
    this.dataService
      .transcribeVideo('hi', this.links[this.selectedIndex].link)
      .then((e) => {
        if (e) {
          this.summary = e.summary;
          this.transsummary = e.translated_summary;
        }
      });
  }
}
