import { NgModule } from "@angular/core";
import { ReusableComponentsModule } from "../custom_modules/reusablemodule.module";
import { SharedModules } from "../shared.module";
import { InstructorLoginComponent } from "../../pages/instructor/authorization/instructor-login/instructor-login.component";
import { InstructorSignupComponent } from "../../pages/instructor/authorization/instructor-signup/instructor-signup.component";
import { InstructorOtpComponent } from "../../pages/instructor/authorization/instructor-otp/instructor-otp.component";



@NgModule({
    declarations: [
        InstructorLoginComponent,
        InstructorSignupComponent,
        InstructorOtpComponent,
    ],
    exports: [],
    imports: [
        ReusableComponentsModule,
        SharedModules,
        
    ]
})
  export class InstructorModule {}