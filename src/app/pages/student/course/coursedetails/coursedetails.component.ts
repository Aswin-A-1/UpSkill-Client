import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  items = [
    {
      title: 'Accordion Item 1',
      content: 'Content for the first accordion item.'
    },
    {
      title: 'Accordion Item 2',
      content: 'Content for the second accordion item.'
    },
    {
      title: 'Accordion Item 3',
      content: 'Content for the third accordion item.'
    }
  ];
  
  activeIndex: number | null = null;

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  
  product = {
    name: 'Product Name',
    description: 'This is a great product with detailed information.',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 2,
    categories: ['Category 1', 'Category 2', 'Category 3']
  };

  constructor(
    private route: ActivatedRoute,
    private service: StudentHomeService,
    public customToastService: CustomToastService,
  ) {}

  playVideo(sectionId: string, lessonIndex: number) {
    console.log('play video of lesson', lessonIndex, ' of sectionId: ', sectionId)
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['id'];
    });

    this.service.getCourse(this.courseId).subscribe({
      next: (res) => {
        this.course = res.course
        this.sections = res.sections
        console.log('sections form db: ', this.sections)
      }
    })
  }
}
