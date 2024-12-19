import { Component } from '@angular/core';

@Component({
  selector: 'ng-educational',
  standalone: false,

  templateUrl: './educational.component.html',
  styleUrl: './educational.component.scss',
})
export class EducationalComponent {
  links: { name: string; link: string }[] = [];
}
