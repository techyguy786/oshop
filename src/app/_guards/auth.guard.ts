import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    // https://angular.io/api/router/CanActivate
    canActivate(router, state: RouterStateSnapshot): Observable<boolean> {
        // Converting Observable of User to Observable of boolean
        return this.auth.user$.pipe(
            map(user => {
                if (user) { return true; }

                // Step 1 (redirecting the url)
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                return false;
            })
        );
    }
}
