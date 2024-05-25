import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './pages/student/authorization/login/student-login.component';
import { StudentSignupComponent } from './pages/student/authorization/student-signup/student-signup.component';
import { OtpTemplateComponent } from './reusables/templates/otp-template/otp-template.component';
import { HomeComponent } from './pages/student/home/home/home.component';
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

const routes: Routes = [
  // student
  { path: 'login', component: StudentLoginComponent, canActivate: [authGuardForLoggedUser] },
  { path: 'signup', component: StudentSignupComponent },
  { path: 'signup/verify-otp', component: OtpTemplateComponent },
  { path: 'home', component: HomeComponent, canActivate: [studentAuthGuard] },

  // admin
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'student', component: StudentsComponent },
      { path: 'instructor', component: InstructorComponent },
      { path: 'instructor-profile', component: AdmininstructorprofileComponent },
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
    ],
    canActivateChild: [instructorAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }