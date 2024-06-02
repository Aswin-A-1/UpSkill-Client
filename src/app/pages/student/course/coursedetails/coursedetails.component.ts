import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { Course } from '../../../../core/models/student';
import { SectionDb } from '../../../../core/models/course';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrl: './coursedetails.component.css'
})
export class CoursedetailsComponent {
  courseId!: string;
  course!: Course;
  sections: SectionDb[] = []
  
  activeIndex: number | null = null;

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: StudentHomeService,
    public customToastService: CustomToastService,
  ) {}

  playVideo(sectionId: string, lessonIndex: number) {
    this.router.navigate(['coursepreview'], { queryParams: { courseId: this.courseId, sectionId: sectionId, lessonIndex: lessonIndex } });
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['id'];
    });

    this.service.getCourse(this.courseId).subscribe({
      next: (res) => {
        this.course = res.course
        this.sections = res.sections
      }
    })
  }
}
