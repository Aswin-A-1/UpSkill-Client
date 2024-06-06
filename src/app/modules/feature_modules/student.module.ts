import { NgModule } from "@angular/core";
import { StudentLoginComponent } from "../../pages/student/authorization/login/student-login.component";
import { StudentSignupComponent } from "../../pages/student/authorization/student-signup/student-signup.component";
import { ReusableComponentsModule } from "../custom_modules/reusablemodule.module";
import { SharedModules } from "../shared.module";
import { HomeComponent } from "../../pages/home/home/home.component";
import { NavbarComponent } from "../../pages/student/home/navbar/navbar.component";
import { StudenthomeComponent } from "../../pages/student/home/studenthome/studenthome.component";
import { CoursedetailsComponent } from "../../pages/student/course/coursedetails/coursedetails.component";
import { CoursepreviewvideoComponent } from "../../pages/student/course/coursepreviewvideo/coursepreviewvideo.component";
import { CourseenrollComponent } from "../../pages/student/course/courseenroll/courseenroll.component";
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from "../../../environments/environment";
import { MylearningsComponent } from "../../pages/student/course/mylearnings/mylearnings.component";



@NgModule({
    declarations: [
        StudentLoginComponent,
        StudentSignupComponent,
        HomeComponent,
        NavbarComponent,
        StudenthomeComponent,
        CoursedetailsComponent,
        CoursepreviewvideoComponent,
        CourseenrollComponent,
        MylearningsComponent,
    ],
    exports: [],
    imports: [
        ReusableComponentsModule,
        SharedModules,
        NgxStripeModule.forRoot(environment.PAYMENT_PUBLISHABLE_KEY)
        
    ]
})
  export class StudentModule {}