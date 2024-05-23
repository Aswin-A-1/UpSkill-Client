import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-profiledetails',
  templateUrl: './instructor-profiledetails.component.html',
  styleUrl: './instructor-profiledetails.component.css'
})
export class InstructorProfiledetailsComponent {
  constructor(
    private router: Router,
  ) {}

  navigateToAddProfile() {
    this.router.navigate(['instructor/profile/addprofile']);
  }

}
