import { NgModule } from "@angular/core";
import { StudentLoginComponent } from "../../pages/student/authorization/login/student-login.component";
import { StudentSignupComponent } from "../../pages/student/authorization/student-signup/student-signup.component";
import { ReusableComponentsModule } from "../custom_modules/reusablemodule.module";
import { SharedModules } from "../shared.module";
import { HomeComponent } from "../../pages/student/home/home/home.component";
import { NavbarComponent } from "../../pages/student/home/navbar/navbar.component";



@NgModule({
    declarations: [
        StudentLoginComponent,
        StudentSignupComponent,
        HomeComponent,
        NavbarComponent,
    ],
    exports: [],
    imports: [
        ReusableComponentsModule,
        SharedModules,
        
    ]
})
  export class StudentModule {}