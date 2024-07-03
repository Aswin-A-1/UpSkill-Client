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
import { LucideAngularModule, Home, Menu, ArrowLeft, Trash2, Pencil, Plus, Search, ShoppingCart, Heart, BadgeCheck, BadgeX, CircleUserRound, ShoppingBag, Lock, ShieldBan, MapPin, Phone, Play, Pause, Book, MessageSquareText, Send, Circle, CircleCheckBig, ArrowDownToLine, IndianRupee, UsersRound, TrendingUp, ChevronLeft, ChevronRight, BookMarked, GraduationCap } from 'lucide-angular';
import { CapitalizePipe } from "../core/pipes/capitialize.pipe";
import { BaseChartDirective } from 'ng2-charts';
import { ChartModule } from 'primeng/chart';
// import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    declarations: [
        CapitalizePipe,
    ],
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
        BaseChartDirective,
        ChartModule,
        LucideAngularModule.pick({Home, Menu, ArrowLeft, Trash2, Pencil, Plus, Search, ShoppingCart, Heart, BadgeCheck, BadgeX, CircleUserRound, ShoppingBag, Lock, ShieldBan, MapPin, Phone, Play, Pause, Book, MessageSquareText, Send, Circle, CircleCheckBig, ArrowDownToLine, IndianRupee, UsersRound, TrendingUp, ChevronLeft, ChevronRight, BookMarked, GraduationCap})
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
        BaseChartDirective,
        ChartModule,
        LucideAngularModule,
        CapitalizePipe,
    ],
  
})
export class SharedModules{}