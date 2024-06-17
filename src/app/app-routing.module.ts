import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './pages/student/authorization/login/student-login.component';
import { StudentSignupComponent } from './pages/student/authorization/student-signup/student-signup.component';
import { OtpTemplateComponent } from './reusables/templates/otp-template/otp-template.component';
import { HomeComponent } from './pages/home/home/home.component';
import { studentAuthGuard, authGuardForLoggedUser } from './core/guards/student_guard';
import { adminAuthGuard, authGuardForLoggedAdmin } from './core/guards/admin_guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { StudentsComponent } from './pages/admin/students/students.component';
import { InstructorLoginComponent } from './pages/instructor/authorization/instructor-login/instructor-login.component';
import { InstructorSignupComponent } from './pages/instructor/authorization/instructor-signup/instructor-signup.component';
import { InstructorOtpComponent } from './pages/instructor/authorization/instructor-otp/instructor-otp.component';
import { InstructorComponent } from './pages/admin/instructorsection/instructor/instructor.component';
import { AdminLoginComponent } from './pages/admin/authorization/admin-login/admin-login.component';
import { InstructorDashboardComponent } from './pages/instructor/dashboard/instructor-dashboard/instructor-dashboard.component';
import { InstructorCoursesComponent } from './pages/instructor/dashboard/course/instructor-courses/instructor-courses.component';
import { authGuardForLoggedInstructor, instructorAuthGuard } from './core/guards/instructor_guard';
import { MaininstructorDashboardComponent } from './pages/instructor/dashboard/maininstructor-dashboard/maininstructor-dashboard.component';
import { InstructorAddcourseComponent } from './pages/instructor/dashboard/course/instructor-addcourse/instructor-addcourse.component';
import { InstructorCourselistComponent } from './pages/instructor/dashboard/course/instructor-courselist/instructor-courselist.component';
import { InstructorCoursevideouploadComponent } from './pages/instructor/dashboard/course/instructor-coursevideoupload/instructor-coursevideoupload.component';
import { InstructorAddprofileComponent } from './pages/instructor/profile/instructor-addprofile/instructor-addprofile.component';
import { InstructorProfileComponent } from './pages/instructor/profile/instructor-profile/instructor-profile.component';
import { InstructorProfiledetailsComponent } from './pages/instructor/profile/instructor-profiledetails/instructor-profiledetails.component';
import { AdmininstructorprofileComponent } from './pages/admin/instructorsection/admininstructorprofile/admininstructorprofile.component';
import { StudenthomeComponent } from './pages/student/home/studenthome/studenthome.component';
import { CoursedetailsComponent } from './pages/student/course/coursedetails/coursedetails.component';
import { AdmincourselistComponent } from './pages/admin/course/admincourselist/admincourselist.component';
import { AdmincoursecategoryComponent } from './pages/admin/course/admincoursecategory/admincoursecategory.component';
import { CoursepreviewvideoComponent } from './pages/student/course/coursepreviewvideo/coursepreviewvideo.component';
import { CourseenrollComponent } from './pages/student/course/courseenroll/courseenroll.component';
import { MylearningsComponent } from './pages/student/course/mylearnings/mylearnings.component';
import { InstructorstudentsComponent } from './pages/instructor/dashboard/students/instructorstudents/instructorstudents.component';
import { InstructorstudentlistComponent } from './pages/instructor/dashboard/students/instructorstudentlist/instructorstudentlist.component';
import { InstructorstudentmessagesComponent } from './pages/instructor/dashboard/students/instructorstudentmessages/instructorstudentmessages.component';

const routes: Routes = [
  // student
  { path: '', component: HomeComponent, canActivate: [authGuardForLoggedUser] },
  { path: 'login', component: StudentLoginComponent, canActivate: [authGuardForLoggedUser] },
  { path: 'signup', component: StudentSignupComponent },
  { path: 'signup/verify-otp', component: OtpTemplateComponent },
  { path: 'home', component: StudenthomeComponent, canActivate: [studentAuthGuard] },
  { path: 'course', component: CoursedetailsComponent },
  { path: 'coursepreview', component: CoursepreviewvideoComponent },
  { path: 'enroll', component: CourseenrollComponent, canActivate: [studentAuthGuard] },
  { path: 'mylearnings', component: MylearningsComponent, canActivate: [studentAuthGuard] },

  // admin
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'student', component: StudentsComponent },
      { path: 'instructor', component: InstructorComponent },
      { path: 'instructor-profile', component: AdmininstructorprofileComponent },
      { path: 'courses', component: AdmincourselistComponent },
      { path: 'category', component: AdmincoursecategoryComponent },
      { path: '', redirectTo: 'student', pathMatch: 'full' }
    ],
    canActivateChild: [adminAuthGuard]
  },
  { path: 'admin-login', component: AdminLoginComponent, canActivate: [authGuardForLoggedAdmin] },

  // instructor
  { path: 'instructor-login', component: InstructorLoginComponent, canActivate: [authGuardForLoggedInstructor] },
  { path: 'instructor-signup', component: InstructorSignupComponent },
  { path: 'instructor-signup/verify-otp', component: InstructorOtpComponent },
  {
    path: 'instructor', component: MaininstructorDashboardComponent,
    children: [
      { path: 'dashboard', component: InstructorDashboardComponent },
      {
        path: 'courses', component: InstructorCoursesComponent,
        children: [
          { path: 'addcourse', component: InstructorAddcourseComponent },
          { path: 'addsection', component: InstructorCoursevideouploadComponent },
          { path: '', component: InstructorCourselistComponent }
        ]
      },
      {
        path: 'profile', component: InstructorProfileComponent,
        children: [
          { path: 'addprofile', component:InstructorAddprofileComponent },
          { path: '', component: InstructorProfiledetailsComponent }
        ]
      },
      {
        path: 'student', component: InstructorstudentsComponent,
        children: [
          { path: 'messages', component:InstructorstudentmessagesComponent },
          { path: '', component: InstructorstudentlistComponent }
        ]
      },
    ],
    canActivateChild: [instructorAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }