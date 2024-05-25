import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Instructor } from '../../../../core/models/student';
import { FormControl, FormGroup } from '@angular/forms';
import { InstructorProfileService } from '../../../../core/services/instructor/profile/instructorprofile.service';

@Component({
  selector: 'app-instructor-profiledetails',
  templateUrl: './instructor-profiledetails.component.html',
  styleUrl: './instructor-profiledetails.component.css'
})
export class InstructorProfiledetailsComponent {
  instructor!: Instructor
  profileForm!: FormGroup;
  
  constructor(
    private router: Router,
    private service: InstructorProfileService,
  ) {}

  ngOnInit(): void {
    const instructorId = JSON.parse(localStorage.getItem('instructor')!)._id
    this.service.getInstructor(instructorId).subscribe({
      next: (res) => {
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
    this.router.navigate(['instructor/profile/addprofile']);
  }

}
