import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
        console.log('NavigationEnd event:', event); // Debugging line
      this.viewportScroller.scrollToPosition([0, 0]);
      console.log('Scrolled to top'); // Debugging line
    });
  }
}
