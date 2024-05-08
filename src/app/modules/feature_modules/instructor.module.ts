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
        InstructorCourselistComponent
    ],
    exports: [],
    imports: [
        ReusableComponentsModule,
        SharedModules,
        
    ]
})
  export class InstructorModule {}