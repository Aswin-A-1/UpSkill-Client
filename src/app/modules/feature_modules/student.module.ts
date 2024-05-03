import { NgModule } from "@angular/core";
import { StudentLoginComponent } from "../../pages/student/authorization/login/student-login.component";
import { StudentSignupComponent } from "../../pages/student/authorization/student-signup/student-signup.component";
import { ReusableComponentsModule } from "../custom_modules/reusablemodule.module";
import { SharedModules } from "../shared.module";
import { HomeComponent } from "../../pages/student/home/home/home.component";



@NgModule({
    declarations: [
        StudentLoginComponent,
        StudentSignupComponent,
        HomeComponent
    ],
    exports: [],
    imports: [
        ReusableComponentsModule,
        SharedModules,
        
    ]
})
  export class StudentModule {}