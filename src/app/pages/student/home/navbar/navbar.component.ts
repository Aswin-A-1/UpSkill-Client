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
    private router: Router,
    private service: StudentHomeService,
    public customToastService: CustomToastService,
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value => {
      this.performSearch(value);
    });
  }

  performSearch(query: string) {
    this.service.search(query).subscribe({
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

  navigatToCourse(courseId: string) {
    console.log('redirecting')
    this.router.navigate(['course'], { queryParams: { id: courseId } });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  instructor() {
    this.router.navigateByUrl('/instructor-login');
  }
}
