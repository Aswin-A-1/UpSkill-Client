import { Component, Input } from "@angular/core";
import { CustomToastService } from "../../core/services/customtoast.service";

@Component({
  selector: 'custom-toast',
  template: `
    <div *ngIf="customToastService.showToast && customToastService.toastType === 'success'" class="fixed top-0 left-0 w-full z-50 flex justify-center">
    <div id="toast-default" class="flex items-center mt-4 max-w-xs p-2 text-gray-500 bg-white rounded-lg shadow"
      role="alert">
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-[#66ff00] rounded-lg dark:bg-[#66ff00] dark:text-white">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span class="sr-only">Error icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">{{ customToastService.toastMessage }}</div>
    </div>
    
    </div>
    <div *ngIf="customToastService.showToast && customToastService.toastType === 'error'" class="fixed top-0 left-0 w-full z-50 flex justify-center">
    <div id="toast-default" class="flex items-center mt-4 max-w-xs p-2 text-gray-500 bg-white rounded-lg shadow"
      role="alert">
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-[#f60000] rounded-lg dark:bg-[#f60000] dark:text-white">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 20 20">
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
        <span class="sr-only">Error icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">{{ customToastService.toastMessage }}</div>
    </div>
    </div>
  `
})
export class CustomToastComponent {
  @Input() customToastService!: CustomToastService;
}