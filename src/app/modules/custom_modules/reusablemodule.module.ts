import { NgModule } from "@angular/core";

import { FormInputReusableComponent } from "../../reusables/reusable-components/form-input.component";
import { AuthFormButtonComponent } from "../../reusables/buttons/auth-form-button";


import { LoginTemplateComponent } from "../../reusables/templates/login-template/login-template.component";
import { SignupTemplateComponent } from "../../reusables/templates/signup-template/signup-template.component";
import { SharedModules } from "../shared_modules";
import { OtpTemplateComponent } from "../../reusables/templates/otp-template/otp-template.component";
import { CustomToastComponent } from "../../reusables/reusable-components/toast.component";

@NgModule({
    declarations: [
        FormInputReusableComponent,
        CustomToastComponent,
        AuthFormButtonComponent,
        LoginTemplateComponent,
        SignupTemplateComponent,
        OtpTemplateComponent
    ],
    exports: [
        FormInputReusableComponent,
        CustomToastComponent,
        AuthFormButtonComponent,
        LoginTemplateComponent,
        SignupTemplateComponent,
        OtpTemplateComponent
    ],
    imports: [
        SharedModules
    ]
  })
  export class ReusableComponentsModule {}