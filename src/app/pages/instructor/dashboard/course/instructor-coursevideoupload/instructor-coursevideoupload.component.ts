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
          console.log('inservice: ', this.savedsections.length)

          if(this.savedsections.length == 0) {
            this.sections.push({
              title: '',
              description: '',
              lessons: [{
                title: '',
                description: '',
                vedio: ''
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
        vedio: ''
    }]
    });
  }

  addLesson(index: number): void {
    this.sections[index].lessons.push({
        title: '',
        description: '',
        vedio: ''
    });
  }

  saveSection(index: number): void {
    this.service.saveSection(this.sections[0],  this.courseId).subscribe({
      next: (successResponse: any) => {
        if (successResponse.message) {
          this.savedsections.push(successResponse.newSection)
          console.log('saved', this.savedsections)
          console.log('normal', this.sections)
          this.sections.pop()
          this.customToastService.setToast('success', successResponse.message);
        }
      },
      error: (error: any) => {
        this.customToastService.setToast('error', error.error.error);
      }
    });
  }

  savelesson(index: number): void {
    console.log(this.sections[0]);
  }
}
