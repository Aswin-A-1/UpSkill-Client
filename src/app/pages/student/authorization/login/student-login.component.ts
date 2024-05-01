import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { loginCredentials } from '../../../../core/models/auth';
import { studentLogin } from '../../../../core/state/auth/actions';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent {
  toastMessage: string = '';
  constructor(
    private store : Store,
    public customToastService: CustomToastService,
  ){}
  onSubmitClick(userData: loginCredentials) {
    this.store.dispatch(studentLogin({ userData }))
  }

  ngOnInit(): void {
  }
}
