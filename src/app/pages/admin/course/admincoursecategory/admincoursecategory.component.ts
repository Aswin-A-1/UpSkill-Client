import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminCourseService } from '../../../../core/services/admin/course/admincourse.service';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { Category } from '../../../../core/models/student';

@Component({
  selector: 'app-admincoursecategory',
  templateUrl: './admincoursecategory.component.html',
  styleUrl: './admincoursecategory.component.css'
})
export class AdmincoursecategoryComponent {
  categorys!: Category[]
  showNewCategoryModal: boolean = false;
  newCategoryForm!: FormGroup;
  constructor(
    private router: Router,
    private service: AdminCourseService,
    public customToastService: CustomToastService
  ) {
    this.newCategoryForm = new FormGroup({
      categoryName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
    });
  }

  ngOnInit(): void {
    this.service.getCategory().subscribe({
      next: (res) => {
        if (res) {
          console.log('categories from the backend: ', res.categorys)
          this.categorys = res.categorys
        }
      }
    })
  }

  navigatToCourses() {
    this.router.navigate(['admin/courses']);
  }

  openAddCategoryModal() {
    this.showNewCategoryModal = true
    this.newCategoryForm.reset({
      categoryName: ''
    });
  }

  closeAddCategoryModal() {
    this.showNewCategoryModal = false
  }

  newCategorySubmit() {
    Object.keys(this.newCategoryForm.controls).forEach(control => {
      this.newCategoryForm.get(control)?.markAsTouched();
    });
    this.service.addCategory(this.newCategoryForm.value.categoryName).subscribe({
      next: (successResponse: any) => {
        this.showNewCategoryModal = false
        this.categorys.push(successResponse.newCategory)
        this.customToastService.setToast('success', successResponse.message);

      },
      error: (error: any) => {
        this.customToastService.setToast('error', error.error.error);
      }
    });
  }

}
