import { NgModule } from "@angular/core";
import { ReusableComponentsModule } from "../custom_modules/reusablemodule.module";
import { SharedModules } from "../shared.module";
import { DashboardComponent } from "../../pages/admin/dashboard/dashboard.component";
import { StudentsComponent } from "../../pages/admin/students/students.component";
import { AdminDashboardComponent } from "../../pages/admin/admin-dashboard/admin-dashboard.component";
import { SidebarComponent } from "../../pages/admin/sidebar/sidebar.component";
import { InstructorComponent } from "../../pages/admin/instructor/instructor.component";



@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        StudentsComponent,
        InstructorComponent,
        AdminDashboardComponent
    ],
    exports: [],
    imports: [
        ReusableComponentsModule,
        SharedModules,
        
    ]
})
  export class AdminModule {}