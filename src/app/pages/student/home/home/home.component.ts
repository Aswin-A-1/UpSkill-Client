import { Component } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    public customToastService: CustomToastService,
    private router: Router,
  ) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
