import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { InstructorProfileService } from '../../../../core/services/instructor/profile/instructorprofile.service';
import { InsturcorProfileDetails } from '../../../../core/models/instructor_response.model';
import { Instructor } from '../../../../core/models/instructor.model';

@Component({
  selector: 'app-instructor-profiledetails',
  templateUrl: './instructor-profiledetails.component.html',
  styleUrl: './instructor-profiledetails.component.css'
})
export class InstructorProfiledetailsComponent {
  instructor!: Instructor
  profileForm!: FormGroup;
  
  constructor(
    private _router: Router,
    private _service: InstructorProfileService,
  ) {}

  ngOnInit(): void {
    const instructorId = JSON.parse(localStorage.getItem('instructor')!)._id
    this._service.getInstructor(instructorId).subscribe({
      next: (res: InsturcorProfileDetails) => {
        if (res) {
          this.instructor = res.instructor
        }
      }
    })

    this.profileForm = new FormGroup({
      qualitifcation: new FormControl(this.instructor.qualification, []),
    });
  }

  navigateToAddProfile() {
    this._router.navigate(['instructor/profile/addprofile']);
  }

}
