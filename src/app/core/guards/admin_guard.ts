import { CanActivateChildFn, CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { jwtDecode } from 'jwt-decode';

export const adminAuthGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('admin_token');
  if (!token) {
    router.navigateByUrl('/admin-login');
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      if (decodedToken.user_type == "Admin") {
        return true;
      } else {
        router.navigateByUrl('/admin-login');
        return false;
      }
    } else {
      localStorage.removeItem('admin_token');
      router.navigateByUrl('/admin-login');
      return false;
    }
  } catch (error) {
    localStorage.removeItem('admin_token');
    router.navigateByUrl('/admin-login');
    return false;
  }
};

export const authGuardForLoggedAdmin: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('admin_token');
  if (!token) {
    return true;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      router.navigateByUrl('/admin/student');
      return false;
    }
    return true;
  } catch (error) {
    localStorage.removeItem('admin_token');
    return true;
  }
};
