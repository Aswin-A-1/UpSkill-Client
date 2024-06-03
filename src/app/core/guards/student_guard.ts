import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { CustomToastService } from "../services/customtoast.service";

export const studentAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const customToastService = inject(CustomToastService);

  const token = localStorage.getItem('token');
  if (!token) {
    // router.navigateByUrl('/login');
    customToastService.setToastAndNavigate('error', 'Please login', ['login']);
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      return true;
    } else {
      localStorage.removeItem('token');
      // router.navigateByUrl('/login');
      customToastService.setToastAndNavigate('error', 'Please login', ['login']);
      return false;
    }
  } catch (error) {
    localStorage.removeItem('token');
    // router.navigateByUrl('/login');
    customToastService.setToastAndNavigate('error', 'Please login', ['login']);
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
      router.navigateByUrl('/home');
      return false;
    }
    return true;
  } catch (error) {
    localStorage.removeItem('token');
    return true;
  }
};
