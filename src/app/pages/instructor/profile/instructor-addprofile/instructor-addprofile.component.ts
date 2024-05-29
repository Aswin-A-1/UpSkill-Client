import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Instructor } from '../../../../core/models/student';
import { InstructorProfileService } from '../../../../core/services/instructor/profile/instructorprofile.service';
import { CustomToastService } from '../../../../core/services/customtoast.service';

@Component({
  selector: 'app-instructor-addprofile',
  templateUrl: './instructor-addprofile.component.html',
  styleUrl: './instructor-addprofile.component.css'
})
export class InstructorAddprofileComponent {
  instructor!: Instructor
  profileFile!: File;
  profileFileUrl: string | null = null
  certificateFiles: File[] = [];
  certificateAddUrls: string[] = [];
  certificateFileError: boolean = false
  profileImageFileError: boolean = false
  profileForm!: FormGroup;

  constructor(
    private router: Router,
    private service: InstructorProfileService,
    public customToastService: CustomToastService
  ) {
  }

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
      qualitifcation: new FormControl( '', []),
    });
  }

  navigateToProfile() {
    this.router.navigate(['instructor/profile']);
  }

  onProfileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.profileFileUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onCertificatesChange(event: any) {
    this.certificateFiles = [];
    this.certificateAddUrls = [];
    this.certificateFileError = false;
    let error: boolean = false;
    const files: File[] = Array.from(event.target.files);
    for (const file of files) {
      if (file.type.startsWith('image/')) {
      } else {
        error = true
      }
    }
    if(!error) {
      this.certificateFiles = Array.from(event.target.files);
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = () => {
          this.certificateAddUrls.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      this.certificateFiles = []
      this.certificateAddUrls = []
      this.certificateFileError = true
      this.profileForm.get('profileImage')?.reset
    }
  }

  onSubmit() {
    let instructorData = JSON.parse(localStorage.getItem('instructor')!)
    if(!this.certificateFileError && instructorData) {
      this.service.updateProfile(this.profileForm.get('qualitifcation')?.value, this.profileFile, this.certificateFiles, instructorData._id).subscribe({
        next: (successResponse: any) => {
          localStorage.setItem('instructor', JSON.stringify(successResponse.instructor));
          this.instructor = successResponse.instructor
          this.customToastService.setToast('success', successResponse.message);
        },
        error: (error: any) => {
          this.customToastService.setToast('error', error.error.error);
        }
      });
    }
  }

  removeImage(url: string) {
    const index = this.certificateAddUrls.indexOf(url);
    if (index > -1) {
      this.certificateAddUrls.splice(index, 1);
      this.certificateFiles.splice(index, 1);
    }
  }

}
