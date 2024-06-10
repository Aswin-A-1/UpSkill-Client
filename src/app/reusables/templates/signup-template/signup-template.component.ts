import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthState } from '../../../core/state/auth/reducers';
import { Message } from '../../../core/models/shared.types';
import { CustomToastService } from '../../../core/services/customtoast.service';


@Component({
  selector: 'app-signup-template',
  templateUrl: './signup-template.component.html',
  styleUrl: './signup-template.component.css'
})
export class SignupTemplateComponent {

  showToast: boolean = false;
  toastMessage: string = '';
  messages: Message[] = [];
  errorMessage$: Observable<any | null>;
  signinForm!: FormGroup;

  constructor(
    private _store: Store<{ auth: AuthState }>,
    public customToastService: CustomToastService
  ) {
    this.errorMessage$ = this._store.select(state => state.auth.error);
  }

  ngOnInit() {
    
    

    // this.toastService.add({
    //   severity: 'error',
    //   summary: 'Error Message',
    //   detail: 'This is an error message',
    //   life: 5000
    // });

    this.signinForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.required,
        this.emailValidator.bind(this)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]),
      cpassword: new FormControl('', [
        Validators.required,
        this.passwordMatchValidator
      ])
    });
  }

  @Input() headding: string = ''
  @Input() tag: string = ''
  @Input() type: string = ''
  @Output() submitEvent = new EventEmitter()

  onSubmitClick() {
    this.markFormGroupTouched(this.signinForm);
    if (this.signinForm.valid) {
      this.submitEvent.emit(this.signinForm.value);
    }
  }

  emailValidator(control: FormControl): { [s: string]: boolean } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailPattern.test(control.value)) {
      return { 'emailInvalid': true };
    }
    return null;
  }

  passwordMatchValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value !== control.root.get('password')?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
