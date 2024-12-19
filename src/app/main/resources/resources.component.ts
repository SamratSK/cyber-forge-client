import { Component } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'ng-resources',
  standalone: false,
  
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {
  data: {
    id: number;
    type: string;
    msg: string;
  }[] = [];
  constructor (dataService: DataService) {
    this.data = dataService.updates;
  }
}
