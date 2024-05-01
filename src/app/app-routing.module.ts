import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './pages/student/authorization/login/student-login.component';
import { StudentSignupComponent } from './pages/student/authorization/student-signup/student-signup.component';
import { OtpTemplateComponent } from './reusables/templates/otp-template/otp-template.component';
import { HomeComponent } from './pages/student/home/home/home.component';
import { authGuard } from './core/guards/student_guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { StudentsComponent } from './pages/admin/students/students.component';

const routes: Routes = [
  { path: 'login', component: StudentLoginComponent},
  { path: 'signup', component: StudentSignupComponent },
  { path: 'signup/verify-otp', component: OtpTemplateComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },


  // { path: 'admindashboard', component: DashboardComponent },
  // { path: 'admin/dashboard', component: AdminDashboardComponent },
  // { path: 'admin/students', component: StudentsComponent },
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'student', component: StudentsComponent },
      { path: '', redirectTo: 'student', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }