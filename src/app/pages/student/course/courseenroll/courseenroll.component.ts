import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { Courses } from '../../../../core/models/course';
import { environment } from '../../../../../environments/environment';
import { StudentCourseService } from '../../../../core/services/student/course/studentcourse.service';

const BASE_URL = environment.BASE_URL

declare var Razorpay: any;

@Component({
  selector: 'app-courseenroll',
  templateUrl: './courseenroll.component.html',
  styleUrl: './courseenroll.component.css'
})
export class CourseenrollComponent {
  instructor!: string;
  courseId!: string;
  course!: Courses;
  courses: Courses[] = [];
  isEnrolled: boolean = false;
  enrolled: boolean = false;
  paymentId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: StudentHomeService,
    private courseservice: StudentCourseService,
    public customToastService: CustomToastService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
    });

    const studentId = JSON.parse(localStorage.getItem('user')!)._id

    this.service.isEnrolled(this.courseId, studentId).subscribe({
      next: (res) => {
        this.isEnrolled = res.isEnrolled
      }
    })

    this.service.getCourse(this.courseId).subscribe({
      next: (res) => {
        this.course = res.course
        this.instructor = res.instructor
      }
    })

    this.service.getCourses().subscribe({
      next: (res) => {
        if (res) {
          this.courses = res.courses
        }
      }
    })
  }

  checkout() {
    const razorPayOptions = {
      currency: 'INR',
      // amount: this.course.price * 100,
      amount: this.course.price * 100,
      name: 'UpSkill',
      key: environment.RAZORPAY_KEY,
      theme: {
        color: '#3b28fe'
      },
      modal: {
        ondismiss: () => { }
      },
      handler: ((response: any) => {
        if (response) {
          if (response.razorpay_payment_id) {
            this.handlePaymentSucess(response.razorpay_payment_id)
          }
        }
      })
    }

    Razorpay.open(razorPayOptions);
  }

  handlePaymentSucess(paymentId: string) {
    const userId = JSON.parse(localStorage.getItem('user')!)._id
    this.courseservice.courseEnroll(paymentId, this.courseId, userId, this.course.price).subscribe({
      next: (successResponse: any) => {
        this.paymentId = paymentId
        this.enrolled = true
        this.ngZone.run(() => {
          // this.customToastService.setToast('success', successResponse.message);
        })
        // this.customToastService.setToastAndNavigate('success', successResponse.message, ['login']);
      },
      error: (error: any) => {
        this.customToastService.setToast('error', error.error.error);
      }
    });
  }

  playVideo() {
    this.router.navigate(['coursepreview'], { queryParams: { courseId: this.courseId, sectionId: this.course.sections[0], lessonIndex: 0 } });
  }

  continue() {
    this.router.navigate(['home']);
  }

  enroll(courseId: string) {
    this.router.navigate(['course'], { queryParams: { id: courseId } });
  }
}
