import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-addcourse',
  templateUrl: './instructor-addcourse.component.html',
  styleUrl: './instructor-addcourse.component.css'
})
export class InstructorAddcourseComponent {
  courseForm!: FormGroup;
  constructor(private router: Router) {
    this.courseForm = new FormGroup({
      courseName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      courseDescription: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ]),
      courseCategory: new FormControl('', [
        Validators.required,
      ]),
      coursePrice: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(10000)
      ]),
      courseImage: new FormControl('', [
        Validators.required,
        this.validateImage.bind(this)
      ]),
    });
  }

  navigateToCourseList() {
    this.router.navigate(['instructor/courses']);
  }


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

  removeImage() {
    this.previewUrl = null
    this.courseForm.get('courseImage')?.reset();
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value)
    } else {
      Object.keys(this.courseForm.controls).forEach(field => {
        const control = this.courseForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
    }
  }

  // onCourseImageSelected(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   if (target.files && target.files.length > 0) {
  //     const file = target.files[0];
  //     // Use patchValue instead of setValue
  //     this.courseForm.patchValue({ courseImage: file });
  //   }
  // }

  validateImage(control: AbstractControl): { [key: string]: any } | null {
    if (control.value) {
      const file: string = control.value;
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const extension = file.split('.').pop()?.toLowerCase();
      if (extension && allowedExtensions.indexOf(extension) === -1) {
        return { invalidImage: true };
      }
    }
    return null;
  }


}
