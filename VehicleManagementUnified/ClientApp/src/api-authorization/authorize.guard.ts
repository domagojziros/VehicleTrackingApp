import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { combineLatestWith, map, tap } from 'rxjs/operators';
import { ADMINISTRATOR_ROLE, ApplicationPaths, QueryParameterNames, VERIFIED_USER_ROLE } from './api-authorization.constants';
import { AuthorizeService } from './authorize.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard  {
  constructor(private authorize: AuthorizeService, private router: Router) {
  }
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
      return this.authorize.isAuthenticated()
        .pipe(
          combineLatestWith(this.authorize.getUserRoles()),
          map(([isAuthenticated, userRoles]) => {
            if(!isAuthenticated) {
              return false;
            }

            return this.isAuthorized(<string[]>userRoles)
          }),
          tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state))
        );
  }

  private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
    if (!isAuthenticated) {
      this.router.navigate(ApplicationPaths.LoginPathComponents, {
        queryParams: {
          [QueryParameterNames.ReturnUrl]: state.url
        }
      });
    }
  }

  private isAuthorized(roles: string[]): boolean {
    // Check if the user has at least one of the required roles
    const requiredRoles = [ADMINISTRATOR_ROLE, VERIFIED_USER_ROLE];
    return roles.some(role => requiredRoles.includes(role));
  }
}
