import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      router.navigateByUrl('/login');
      return false;
    }
    return true;
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
    router.navigateByUrl('/login');
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
    router.navigateByUrl('/login');
    return true;
  }
};

export const authGuardWithLogin: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      router.navigateByUrl('/login');
      return false;
    }
    router.navigate(['/home'])
    return true;
  } catch (error) {
    localStorage.removeItem('token');
    router.navigateByUrl('/login');
    return false;
  }
};
