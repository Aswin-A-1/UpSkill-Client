import { NgModule } from "@angular/core";
import { ReusableComponentsModule } from "../custom_modules/reusablemodule.module";
import { SharedModules } from "../shared.module";
import { InstructorLoginComponent } from "../../pages/instructor/authorization/instructor-login/instructor-login.component";
import { InstructorSignupComponent } from "../../pages/instructor/authorization/instructor-signup/instructor-signup.component";
import { InstructorOtpComponent } from "../../pages/instructor/authorization/instructor-otp/instructor-otp.component";
import { MaininstructorDashboardComponent } from "../../pages/instructor/dashboard/maininstructor-dashboard/maininstructor-dashboard.component";
import { InstructorSidebarComponent } from "../../pages/instructor/dashboard/instructor-sidebar/instructor-sidebar.component";
import { InstructorDashboardComponent } from "../../pages/instructor/dashboard/instructor-dashboard/instructor-dashboard.component";
import { InstructorCoursesComponent } from "../../pages/instructor/dashboard/course/instructor-courses/instructor-courses.component";
import { InstructorAddcourseComponent } from "../../pages/instructor/dashboard/course/instructor-addcourse/instructor-addcourse.component";
import { InstructorCourselistComponent } from "../../pages/instructor/dashboard/course/instructor-courselist/instructor-courselist.component";
import { InstructorCoursevideouploadComponent } from "../../pages/instructor/dashboard/course/instructor-coursevideoupload/instructor-coursevideoupload.component";
import { InstructorAddprofileComponent } from "../../pages/instructor/profile/instructor-addprofile/instructor-addprofile.component";
import { InstructorProfileComponent } from "../../pages/instructor/profile/instructor-profile/instructor-profile.component";
import { InstructorProfiledetailsComponent } from "../../pages/instructor/profile/instructor-profiledetails/instructor-profiledetails.component";
import { InstructorstudentsComponent } from "../../pages/instructor/dashboard/students/instructorstudents/instructorstudents.component";
import { InstructorstudentlistComponent } from "../../pages/instructor/dashboard/students/instructorstudentlist/instructorstudentlist.component";
import { InstructorstudentmessagesComponent } from "../../pages/instructor/dashboard/students/instructorstudentmessages/instructorstudentmessages.component";



@NgModule({
    declarations: [
        InstructorLoginComponent,
        InstructorSignupComponent,
        InstructorOtpComponent,
        MaininstructorDashboardComponent,
        InstructorSidebarComponent,
        InstructorDashboardComponent,
        InstructorCoursesComponent,
        InstructorAddcourseComponent,
        InstructorCourselistComponent,
        InstructorCoursevideouploadComponent,
        InstructorAddprofileComponent,
        InstructorProfileComponent,
        InstructorProfiledetailsComponent,
        InstructorstudentsComponent,
        InstructorstudentlistComponent,
        InstructorstudentmessagesComponent,
    ],
    exports: [],
    imports: [
        ReusableComponentsModule,
        SharedModules,
        
    ]
})
  export class InstructorModule {}