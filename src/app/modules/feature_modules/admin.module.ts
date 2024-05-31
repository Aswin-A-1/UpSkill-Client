import { NgModule } from "@angular/core";
import { ReusableComponentsModule } from "../custom_modules/reusablemodule.module";
import { SharedModules } from "../shared.module";
import { DashboardComponent } from "../../pages/admin/dashboard/dashboard.component";
import { StudentsComponent } from "../../pages/admin/students/students.component";
import { AdminDashboardComponent } from "../../pages/admin/admin-dashboard/admin-dashboard.component";
import { SidebarComponent } from "../../pages/admin/sidebar/sidebar.component";
import { InstructorComponent } from "../../pages/admin/instructorsection/instructor/instructor.component";
import { AdminLoginComponent } from "../../pages/admin/authorization/admin-login/admin-login.component";
import { AdmininstructorprofileComponent } from "../../pages/admin/instructorsection/admininstructorprofile/admininstructorprofile.component";
import { AdmincourselistComponent } from "../../pages/admin/course/admincourselist/admincourselist.component";
import { AdmincoursecategoryComponent } from "../../pages/admin/course/admincoursecategory/admincoursecategory.component";



@NgModule({
    declarations: [
        AdminLoginComponent,
        DashboardComponent,
        SidebarComponent,
        StudentsComponent,
        InstructorComponent,
        AdminDashboardComponent,
        AdmininstructorprofileComponent,
        AdmincourselistComponent,
        AdmincoursecategoryComponent,
    ],
    exports: [],
    imports: [
        ReusableComponentsModule,
        SharedModules,
        
    ]
})
  export class AdminModule {}