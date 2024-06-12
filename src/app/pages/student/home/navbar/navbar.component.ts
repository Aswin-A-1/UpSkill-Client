import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { FormControl, FormGroup } from '@angular/forms';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { Courses } from '../../../../core/models/course';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchControl: FormControl = new FormControl('');
  @Input()isloggedin: boolean = false;
  serachResult: Courses[] = [];
  isFocused = false;
  
  constructor(
    private _router: Router,
    private _service: StudentHomeService,
    public customToastService: CustomToastService,
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value => {
      this.performSearch(value);
    });
  }

  performSearch(query: string) {
    this._service.search(query).subscribe({
      next: (res) => {
        if (res.courses) {
          this.serachResult = res.courses
        }
      }
    })
  }
  
  onFocus() {
    this.isFocused = true;
  }

  onBlur(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (!relatedTarget || !relatedTarget.closest('.suggestion-item')) {
      setTimeout(() => {
        this.isFocused = false;
      }, 200);
    }
  }

  stopBlur(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  navigateToHome() {
    this._router.navigate(['home']);
  }

  navigateToMyLearnings() {
    this._router.navigate(['mylearnings']);
  }

  navigatToCourse(courseId: string) {
    this._router.navigate(['course'], { queryParams: { id: courseId } });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this._router.navigateByUrl('/');
  }

  login() {
    this._router.navigateByUrl('/login');
  }

  instructor() {
    this._router.navigateByUrl('/instructor-login');
  }
}
