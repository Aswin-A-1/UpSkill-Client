import { Component } from '@angular/core';
import { CustomToastService } from '../../../../../core/services/customtoast.service';

@Component({
  selector: 'app-instructorstudents',
  templateUrl: './instructorstudents.component.html',
  styleUrl: './instructorstudents.component.css'
})
export class InstructorstudentsComponent {
  constructor(
    public _customToastService: CustomToastService
  ) {}
}
