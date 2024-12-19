import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackdropService {
  backdropClicked$ = new Subject();
  backdropOpened$ = new BehaviorSubject<boolean>(false);

  open() {
    this.backdropOpened$.next(true);
  }

  close() {
    this.backdropOpened$.next(false);
  }
}
