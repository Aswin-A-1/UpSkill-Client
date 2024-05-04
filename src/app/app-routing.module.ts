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
import { InstructorComponent } from './pages/admin/instructor/instructor.component';
import { AdminLoginComponent } from './pages/admin/authorization/admin-login/admin-login.component';

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
      { path: '', redirectTo: 'student', pathMatch: 'full' }
    ],
    canActivateChild: [adminAuthGuard]
  },
  { path: 'admin-login', component: AdminLoginComponent, canActivate: [authGuardForLoggedAdmin] },
  
  // instructor
  { path: 'instructor-login', component: InstructorLoginComponent},
  { path: 'instructor-signup', component: InstructorSignupComponent},
  { path: 'instructor-signup/verify-otp', component: InstructorOtpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }