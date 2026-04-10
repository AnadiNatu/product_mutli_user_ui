import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router, 
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard - Protects routes from unauthorized access
 * Features:
 * - Checks if user is logged in
 * - Validates user role matches route requirements
 * - Redirects to login if unauthorized
 * - Preserves return URL for redirect after login
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
 
    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
    }
 
    const expectedRole = route.data['role'];
    const userRole = this.authService.getUserRole();
 
    if (expectedRole && userRole !== expectedRole) {
      if (userRole === 'ADMIN') {
        return this.router.createUrlTree(['/admin/dashboard']);
      } else if (userRole === 'USER') {
        return this.router.createUrlTree(['/user/products']);
      } else {
        return this.router.createUrlTree(['/auth/login']);
      }
    }
 
    return true;
  }
}