import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContextUserRouteGuardGuard implements CanActivate {

  searchParamModel = new SearchParam();

  constructor(private authSevice: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.searchParamModel.token = sessionStorage.getItem("authToken");
      this.searchParamModel.flag = sessionStorage.getItem("role");
  
      this.authSevice.checkContextUserRoutePerm(this.searchParamModel).subscribe((resp: any) => {
  
        if (resp.code === 1) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      })
  
      return true;
  }
  
}
