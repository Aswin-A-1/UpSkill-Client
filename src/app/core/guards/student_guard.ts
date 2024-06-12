import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { CustomToastService } from "../services/customtoast.service";
import { firstValueFrom } from 'rxjs';
import { StudentProfileService } from "../services/student/profile/studentprofile.service";

export const studentAuthGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const customToastService = inject(CustomToastService);
  const studentProfileService = inject(StudentProfileService);

  const token = localStorage.getItem('refresh_token');
  // const token = localStorage.getItem('token');
  if (!token) {
    // router.navigateByUrl('/login');
    customToastService.setToastAndNavigate('error', 'Please login', ['login']);
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp > currentTime) {
      // const studentid = decodedToken.id
      // const res = await firstValueFrom(studentProfileService.getStudent(studentid));
      // if(res.student.isBlocked) {
      //   localStorage.removeItem('refresh_token');
      //   localStorage.removeItem('token');
      //   router.navigateByUrl('/login');
      //   return false;
      // } else {
      //   return true;
      // }
      return true;
    } else {
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('token');
      // router.navigateByUrl('/login');
      customToastService.setToastAndNavigate('error', 'Please login', ['login']);
      return false;
    }
  } catch (error) {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    // router.navigateByUrl('/login');
    customToastService.setToastAndNavigate('error', 'Please login', ['login']);
    return false;
  }
};

export const authGuardForLoggedUser: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('refresh_token');
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
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    return true;
  } catch (error) {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    return true;
  }
};
