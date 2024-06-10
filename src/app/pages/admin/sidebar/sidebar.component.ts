import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(
    private _router: Router,
  ) {}

  click(){
    console.log('clicked')
  }

  logout() {
    localStorage.removeItem('admin_token');
    this._router.navigateByUrl('/admin-login');
  }
}
