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
  showDeleteCategoryModal: boolean = false;
  newCategoryForm!: FormGroup;
  isDropdownOpen: { [key: string]: boolean } = {};
  lastOpenedDropdown: string = '';
  deleteCategoryId!: string | null;
  deleteCategoryIndex!: number | null;
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 0;
  index = 1;

  constructor(
    private _router: Router,
    private _service: AdminCourseService,
    public _customToastService: CustomToastService
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
    this.fetchCategory();
  }

  async fetchCategory() {
    this._service.getCategory(this.currentPage, this.itemsPerPage).subscribe({
      next: (res) => {
        if (res) {
          this.categorys = res.categorys
          this.totalPages = Math.ceil(res.totalcount / this.itemsPerPage);
        }
      }
    })
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchCategory();
      this.index += this.itemsPerPage;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchCategory();
      this.index -= this.itemsPerPage;
    }
  }

  toggleDropdown(categoryId: any, event: MouseEvent) {
    event.stopPropagation();

    if (this.lastOpenedDropdown && this.lastOpenedDropdown !== categoryId) {
      this.isDropdownOpen[this.lastOpenedDropdown] = false;
    }
    
    this.isDropdownOpen[categoryId] = !this.isDropdownOpen[categoryId];
    
    if (this.isDropdownOpen[categoryId]) {
      this.lastOpenedDropdown = categoryId;
    } else {
      this.lastOpenedDropdown = '';
    }
  }

  closeDropdownOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(target)) {
        this.isDropdownOpen[this.lastOpenedDropdown] = false;
        this.lastOpenedDropdown = '';
      }
    });
  }

  navigatToCourses() {
    this._router.navigate(['admin/courses']);
  }

  openAddCategoryModal() {
    this.showNewCategoryModal = true
    this.newCategoryForm.reset({
      categoryName: ''
    });
  }

  openDeleteCategoryModal(id: string, index: number) {
    this.deleteCategoryId = id
    this.deleteCategoryIndex = index
    this.showDeleteCategoryModal = true
  }

  closeDeleteCategoryModal() {
    this.deleteCategoryId = null
    this.deleteCategoryIndex = null
    this.showDeleteCategoryModal = false
  }

  closeAddCategoryModal() {
    this.showNewCategoryModal = false
  }

  deleteCategory() {
    if(this.deleteCategoryId != null) {
      this._service.deleteCategory(this.deleteCategoryId).subscribe({
        next: (successResponse) => {
          if (this.deleteCategoryIndex != null) {
            this.categorys.splice(this.deleteCategoryIndex, 1)
            this.deleteCategoryId = null
            this.deleteCategoryIndex = null
            this.showDeleteCategoryModal = false
            this._customToastService.setToast('success', successResponse.message);
          }
        },
        error: (error) => {
          this._customToastService.setToast('error', error.error.error);
        }
      });
    }
  }

  newCategorySubmit() {
    Object.keys(this.newCategoryForm.controls).forEach(control => {
      this.newCategoryForm.get(control)?.markAsTouched();
    });
    if(this.newCategoryForm.valid) {
      this._service.addCategory(this.newCategoryForm.value.categoryName).subscribe({
        next: (successResponse) => {
          this.showNewCategoryModal = false
          this.categorys.push(successResponse.newCategory)
          this._customToastService.setToast('success', successResponse.message);
  
        },
        error: (error) => {
          this._customToastService.setToast('error', error.error.error);
        }
      });
    }
  }

}
