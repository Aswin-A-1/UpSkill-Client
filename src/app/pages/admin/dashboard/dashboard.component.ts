import { Component } from '@angular/core';
import { AdminCourseService } from '../../../core/services/admin/course/admincourse.service';
import { CourseCompletion } from '../../../core/models/admin_response.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  overallData: any;
  individualData: any;
  revenueData: any; 
  options: any;
  totalRevenue: number = 0;
  totalStudents: number = 0;
  trendingCourse: string = 'No course';
  monthlyEnrollments: { [key: string]: number } = {};
  individualCourseMonthlyEnrollments: { [key: string]: { [key: string]: number } } = {};
  revenuePerCourse: { [key: string]: number } = {}
  courseCompletionRates: CourseCompletion[] | null = null
  constructor(
    private courseService: AdminCourseService,
  ) {}

  ngOnInit() {
    const instructorId = JSON.parse(localStorage.getItem('instructor')!)._id;

    this.courseService.getDashboardData().subscribe({
      next: (res) => {
        if (res) {
          this.totalRevenue = res.totalRevenue;
          this.totalStudents = res.totalStudents;
          this.trendingCourse = res.trendingCourse;
          this.monthlyEnrollments = res.monthlyEnrollments;
          this.individualCourseMonthlyEnrollments = res.individualCourseMonthlyEnrollments;
          this.revenuePerCourse = res.revenuePerCourse;
          this.courseCompletionRates = Object.keys(res.courseCompletionRates).map(courseName => ({
            courseName: courseName,
            completionRate: res.courseCompletionRates[courseName]
          }));
          this.setupChartData();
        }
      }
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary,
            precision: 0
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  setupChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const colors = ['--blue-500', '--green-500', '--pink-500', '--orange-500', '--purple-500'];

    const overallLabels = Object.keys(this.monthlyEnrollments).sort();
    const revenuePerCourseLabels = Object.keys(this.revenuePerCourse).sort();
    const overallDataPoints = overallLabels.map(label => this.monthlyEnrollments[label]);

    this.overallData = {
      labels: overallLabels,
      datasets: [
        {
          label: 'Overall Monthly Enrollments',
          data: overallDataPoints,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        }
      ]
    };

    const datasets = [];
    let colorIndex = 0;

    for (const courseId in this.individualCourseMonthlyEnrollments) {
      const courseMonthlyEnrollments = this.individualCourseMonthlyEnrollments[courseId];
      const courseLabels = overallLabels;
      const courseData = courseLabels.map(label => courseMonthlyEnrollments[label] || 0);

      datasets.push({
        label: `${courseId}`,
        data: courseData,
        fill: false,
        borderColor: documentStyle.getPropertyValue(colors[colorIndex % colors.length]),
        tension: 0.4
      });

      colorIndex++;
    }

    this.individualData = {
      labels: overallLabels,
      datasets
    };

    const revenueDataPoints = revenuePerCourseLabels.map(label => this.revenuePerCourse[label]);
    const revenueColors = revenuePerCourseLabels.map((_, index) => documentStyle.getPropertyValue(colors[index % colors.length]));

    this.revenueData = {
      labels: revenuePerCourseLabels,
      datasets: [
        {
          label: 'Revenue Per Course',
          data: revenueDataPoints,
          backgroundColor: revenueColors,
          borderColor: revenueColors,
          borderWidth: 1,
        }
      ]
    };

    // const revenueDataPoints = revenuePerCourseLabels.map(label => this.revenuePerCourse[label]);

    // this.revenueData = {
    //   labels: revenuePerCourseLabels,
    //   datasets: [
    //     {
    //       label: 'Revenue per Course',
    //       data: revenueDataPoints,
    //       backgroundColor: documentStyle.getPropertyValue('--blue-500'),
    //       borderWidth: 2,
    //     }
    //   ]
    // };
  }

}
