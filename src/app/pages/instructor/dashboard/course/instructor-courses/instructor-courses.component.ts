import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrl: './instructor-courses.component.css'
})
export class InstructorCoursesComponent {

  
  previewUrl: string | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  
  // Define the form model
  courseForm = new FormGroup({
    courseTitle: new FormControl('', Validators.required),
    courseDescription: new FormControl('', Validators.required),
    courseCategory: new FormControl('', Validators.required),
    courseLevel: new FormControl('', Validators.required),
    courseDuration: new FormControl('', Validators.required),
    coursePrice: new FormControl('', Validators.required),
    instructor: new FormControl('', Validators.required),
    instructorBio: new FormControl(''),
    courseImage: new FormControl<File | null>(null),
    courseVideo: new FormControl<File | null>(null),
    courseOutline: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    enrollmentLimit: new FormControl('', Validators.required),
    enrollmentOpenDate: new FormControl('', Validators.required),
    enrollmentCloseDate: new FormControl('', Validators.required)
  });

  // Method to handle form submission
  onSubmit() {
    // Implement your logic to handle form submission here
    console.log(this.courseForm.value);
  }

  onCourseImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.courseForm.get('courseImage')?.setValue(file);
    }
  }
  
  onCourseVideoSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.courseForm.get('courseVideo')?.setValue(file);
    }
  }
  
}
