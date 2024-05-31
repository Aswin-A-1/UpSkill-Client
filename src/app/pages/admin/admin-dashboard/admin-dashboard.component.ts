import { Component } from '@angular/core';
import { CustomToastService } from '../../../core/services/customtoast.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(
    public customToastService: CustomToastService
  ) {}
}
