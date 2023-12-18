import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn, CanDeactivateFn, CanActivate, CanDeactivate, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})

export class UserGuard implements CanActivate{
    constructor(private router:Router,private authSvc:AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authSvc.getSignedInUser().pipe(
			switchMap(result => {
				const canActivate = result.email? true : false
				if (canActivate) {
					console.log("you are active user proceed")
					return of(true)
				} else {
					this.router.navigate(['all'])
					return of(false)
				}
			}),
            catchError(error=>{
                this.router.navigate([''])
                return of (false)
            })
        )
    }
}