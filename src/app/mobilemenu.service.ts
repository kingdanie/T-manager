import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobilemenuService {

  private isOpenSubject = new BehaviorSubject<boolean>(false); // Initial state

  isMobileMenuOpen$ = this.isOpenSubject.asObservable();

  toggleSideMenu() {
    this.isOpenSubject.next(!this.isOpenSubject.getValue());
  }
}
