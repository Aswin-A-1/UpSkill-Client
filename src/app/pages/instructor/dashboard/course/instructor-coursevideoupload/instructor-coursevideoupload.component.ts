import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionDb, Sections, lessons  } from '../../../../../core/models/course';
import { InstructorCourseService } from '../../../../../core/services/instructor/course/instructorcourse.service';
import { CustomToastService } from '../../../../../core/services/customtoast.service';

@Component({
  selector: 'app-instructor-coursevideoupload',
  templateUrl: './instructor-coursevideoupload.component.html',
  styleUrl: './instructor-coursevideoupload.component.css'
})
export class InstructorCoursevideouploadComponent {
  savedsections: SectionDb[] = []
  courseId!: string
  
  sections: Sections[] = [];
  // lessons: lessons[] = [];
  
  files: { [key: number]: File } = {};
  previewUrls: string[][] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: InstructorCourseService,
    public customToastService: CustomToastService
  ) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['id'];
    });

    this.service.getSection(this.courseId).subscribe({
      next: (res) => {
        if (res) {
          this.savedsections = res.sections

          if(this.savedsections.length == 0) {
            this.sections.push({
              title: '',
              description: '',
              lessons: [{
                title: '',
                description: '',
                vedio: null
            }]
            })
          }
        }
      }
    })
  }

  addSection(): void {
    this.sections.push({
      title: '',
      description: '',
      lessons: [{
        title: '',
        description: '',
        vedio: null
    }]
    });
  }

  addLesson(index: number): void {
    this.sections[index].lessons.push({
        title: '',
        description: '',
        vedio: null
    });
  }

  saveSection(index: number): void {
    this.service.saveSection(this.sections[0], this.files,  this.courseId).subscribe({
      next: (successResponse: any) => {
        if (successResponse.message) {
          this.savedsections.push(successResponse.newSection)
          this.sections.pop()
          this.customToastService.setToast('success', successResponse.message);
        }
      },
      error: (error: any) => {
        this.customToastService.setToast('error', error.error.error);
      }
    });

    // this.service.saveSection(this.sections[0], this.file,  this.courseId).subscribe({
    //   next: (successResponse: any) => {
    //     if (successResponse.message) {
    //       this.savedsections.push(successResponse.newSection)
    //       this.sections.pop()
    //       this.customToastService.setToast('success', successResponse.message);
    //     }
    //   },
    //   error: (error: any) => {
    //     this.customToastService.setToast('error', error.error.error);
    //   }
    // });
  }

  savelesson(index: number): void {
    console.log(this.sections[0]);
  }

  onFileSelected(event: any, i: number, j: number) {
    const file = event.target.files[0];
    if (file) {
      this.previewUrls[i] = this.previewUrls[i] || [];
      this.files[j] = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrls[i][j] = reader.result as string;
        // console.log(i, j);
        // console.log('files: ', this.files)
        // console.log('urls: ', this.previewUrls)
      };
      reader.readAsDataURL(file);
    }
    // this.file = event.target.files[0];
    // if (this.file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.previewUrl = reader.result as string;
    //     console.log(this.previewUrl, i, j)
    //   };
    //   reader.readAsDataURL(this.file);
    // }
  }

  removeVideo(i: number, j: number) {
    this.previewUrls[i][j] = null as unknown as string;
    delete this.files[j];
    // this.files[i][j] = null as unknown as File;
    // this.courseForm.get('courseImage')?.reset();
  }
}
