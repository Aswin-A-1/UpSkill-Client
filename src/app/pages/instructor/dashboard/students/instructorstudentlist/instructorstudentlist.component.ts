import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructorstudentlist',
  templateUrl: './instructorstudentlist.component.html',
  styleUrl: './instructorstudentlist.component.css'
})
export class InstructorstudentlistComponent {
  constructor(
    private _router: Router,
  ) {}

  navigateToMessages() {
    this._router.navigate(['instructor/student/messages']);
  }
}
