import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstructorCourseService } from '../../../../../core/services/instructor/course/instructorcourse.service';
import { CustomToastService } from '../../../../../core/services/customtoast.service';

@Component({
  selector: 'app-instructor-addcourse',
  templateUrl: './instructor-addcourse.component.html',
  styleUrl: './instructor-addcourse.component.css'
})
export class InstructorAddcourseComponent {
  courseForm!: FormGroup;
  file!: File;
  constructor(
    private router: Router,
    private service: InstructorCourseService,
    public customToastServices: CustomToastService
  ) {
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
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  removeImage() {
    this.previewUrl = null
    this.courseForm.get('courseImage')?.reset();
  }

  onSubmit() {
    if (this.courseForm.valid && this.file) {
      console.log()
      let instructor_id = JSON.parse(localStorage.getItem('instructor')!)
      if(instructor_id) {
        this.service.addCourseDetails(this.courseForm.value, this.file,  instructor_id._id).subscribe({
          next: (successResponse: any) => {
            if (successResponse.message) {
              localStorage.removeItem('userData');
              this.customToastServices.setToast('success', successResponse.message, ['login']);
              // this.toastService.set('success', successResponse.message);
            }
          },
          error: (error: any) => {
            // this.toastService.set('error', error.error.error || 'An error occurred');
            this.customToastServices.setToast('error', error.error.error);
          }
        });
      }
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
