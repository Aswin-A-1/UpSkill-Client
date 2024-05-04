import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { jwtDecode } from 'jwt-decode';

export const studentAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      if (decodedToken.user_type == "Student") {
        return true;
      } else {
        router.navigateByUrl('/login');
        return false;
      }
    } else {
      localStorage.removeItem('token');
      router.navigateByUrl('/login');
      return false;
    }
  } catch (error) {
    localStorage.removeItem('token');
    router.navigateByUrl('/login');
    return false;
  }
};

export const authGuardForLoggedUser: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    return true;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      if (decodedToken.user_type == 'Student') {
        router.navigateByUrl('/home');
        return false;
      } else if (decodedToken.user_type == 'Admin') {
        router.navigateByUrl('/admin/student');
        return false;
      }
    }
    return true;
  } catch (error) {
    localStorage.removeItem('token');
    return true;
  }
};

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      if (decodedToken.user_type == "Admin") {
        return true;
      } else {
        router.navigateByUrl('/login');
        return false;
      }
    } else {
      localStorage.removeItem('token');
      router.navigateByUrl('/login');
      return false;
    }
  } catch (error) {
    localStorage.removeItem('token');
    router.navigateByUrl('/login');
    return false;
  }
};
