import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstructorCourseService } from '../../../../../core/services/instructor/course/instructorcourse.service';
import { CustomToastService } from '../../../../../core/services/customtoast.service';
import { Category } from '../../../../../core/models/student';
import { AdminCourseService } from '../../../../../core/services/admin/course/admincourse.service';

@Component({
  selector: 'app-instructor-addcourse',
  templateUrl: './instructor-addcourse.component.html',
  styleUrl: './instructor-addcourse.component.css'
})
export class InstructorAddcourseComponent {
  courseForm!: FormGroup;
  file!: File;
  isVerified!: boolean
  categorys!: Category[]
  constructor(
    private _router: Router,
    private _service: InstructorCourseService,
    private _categoryservice: AdminCourseService,
    public _customToastService: CustomToastService
  ) {
    
    const instructor = JSON.parse(localStorage.getItem('instructor')!)
    this._service.getVerification(instructor._id).subscribe({
      next: (res) => {
        if (res) {
          this.isVerified = res.verification
          console.log('verfication received: ', this.isVerified)
        }
      }
    })

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

  

  ngOnInit(): void {
    this._categoryservice.getCategory().subscribe({
      next: (res) => {
        if (res) {
          this.categorys = res.categorys
        }
      }
    })
  }

  navigateToCourseList() {
    this._router.navigate(['instructor/courses']);
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

  navigateToProfile() {
    this._router.navigate(['instructor/profile']);
  }

  onSubmit() {
    if (this.courseForm.valid && this.file) {
      console.log()
      let instructor_id = JSON.parse(localStorage.getItem('instructor')!)
      if(instructor_id) {
        this._service.addCourseDetails(this.courseForm.value, this.file,  instructor_id._id).subscribe({
          next: (successResponse: any) => {
            if (successResponse.message) {
              this._customToastService.setToastAndNavigateWithQueryparams('success', successResponse.message, 'instructor/courses/addsection', successResponse.courseId);
            }
          },
          error: (error: any) => {
            this._customToastService.setToast('error', error.error.error);
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
