import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CustomToastService {
    showToast: boolean = false;
    toastMessage: string = '';
    toastType: string = '';

    constructor(
        private router: Router
    ) { }

    setToast(type: string, message: string, navigateTo?: string[]) {
        if (navigateTo && navigateTo.length > 0) {
            this.router.navigate(navigateTo);
        }
        this.showToast = true;
        this.toastMessage = message;
        this.toastType = type;
        setTimeout(() => {
            this.clearToast();
        }, 3000);
    }

    setToastAndNavigate(type: string, message: string, navigateTo: string[] = []) {
        if (navigateTo.length > 0) {
            this.router.navigate(navigateTo);
        }
        this.showToast = true;
        this.toastMessage = message;
        this.toastType = type;
        setTimeout(() => {
            this.clearToast();
        }, 3000);
    }

    setToastAndNavigateWithQueryparams(type: string, message: string, navigateTo: string, id: string) {
        if (navigateTo.length > 0) {
            this.router.navigate([navigateTo], { queryParams: { id: id } });
        }
        this.showToast = true;
        this.toastMessage = message;
        this.toastType = type;
        setTimeout(() => {
            this.clearToast();
        }, 3000);
    }

    clearToast() {
        this.showToast = false;
        this.toastMessage = '';
        this.toastType = '';
    }
}
