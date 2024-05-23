import { Component } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.css'
})
export class InstructorProfileComponent {
  constructor(
    public customToastService: CustomToastService
  ) {}

}
