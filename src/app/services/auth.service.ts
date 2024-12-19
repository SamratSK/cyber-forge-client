import { Injectable } from '@angular/core';
import { User } from '@interfaces/auth.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = new BehaviorSubject<User | undefined>(undefined);
}
