import { CanActivateChildFn, CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { jwtDecode } from 'jwt-decode';

export const instructorAuthGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('instructor_token');
  if (!token) {
    router.navigateByUrl('/instructor-login');
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      if (decodedToken.user_type == "Instructor") {
        return true;
      } else {
        router.navigateByUrl('/instructor-login');
        return false;
      }
    } else {
      localStorage.removeItem('instructor_token');
      router.navigateByUrl('/instructor-login');
      return false;
    }
  } catch (error) {
    localStorage.removeItem('instructor_token');
    router.navigateByUrl('/instructor-login');
    return false;
  }
};

export const authGuardForLoggedInstructor: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('instructor_token');
  if (!token) {
    return true;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      router.navigateByUrl('/instructor/courses');
      return false;
    }
    return true;
  } catch (error) {
    localStorage.removeItem('instructor_token');
    return true;
  }
};
