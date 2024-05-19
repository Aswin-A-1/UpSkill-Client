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
import { LucideAngularModule, File, Home, Menu, UserCheck, ArrowLeft, Trash2, EllipsisVertical, Pencil, Plus, Search, ShoppingCart, Heart } from 'lucide-angular';

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
        LucideAngularModule.pick({Home, Menu, ArrowLeft, Trash2, Pencil, Plus, Search, ShoppingCart, Heart})
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
        RatingModule,
        LucideAngularModule
    ],
  
})
export class SharedModules{}