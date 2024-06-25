import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-sidebar',
  templateUrl: './instructor-sidebar.component.html',
  styleUrl: './instructor-sidebar.component.css'
})
export class InstructorSidebarComponent {

  isSidebarOpen = false;


  constructor(
    private _router: Router,
  ) {}


    

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  
  logout() {
    localStorage.removeItem('instructor_token');
    this._router.navigateByUrl('/instructor-login');
  }
}
