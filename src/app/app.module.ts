import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentModule } from './modules/feature_modules/student.module';
import { AdminModule } from './modules/feature_modules/admin.module';
import { SharedModules } from './modules/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './core/state/auth/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { authReducer } from './core/state/auth/reducers';

import { AuthTokenInterceptorService } from './core/interceptors/authtoken.interceptor';

import { MessageService } from 'primeng/api';
import { AdminEffects } from './core/state/admin/effects';
import { InstructorModule } from './modules/feature_modules/instructor.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StudentModule,
    AdminModule,
    InstructorModule,
    SharedModules,
    ToastModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot(
      {
        auth: authReducer,
      }),
    EffectsModule.forRoot(
      [
        AuthEffects,
        AdminEffects
      ]
    ),
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
