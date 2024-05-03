import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { InputOtpModule } from 'primeng/inputotp';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';

@NgModule({
    imports : [
        FormsModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        ProgressSpinnerModule,
        // ToastModule,
        MessagesModule,
        InputOtpModule,
        TableModule,
        RatingModule,
    ],
    exports : [
        FormsModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        ProgressSpinnerModule,
        // ToastModule,
        MessagesModule,
        InputOtpModule,
        TableModule,
        RatingModule
    ],
  
})
export class SharedModules{}