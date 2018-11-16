import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    // https://angular.io/api/router/CanActivate
    canActivate(): Observable<boolean> {
        // Converting Observable of User to Observable of boolean
        return this.auth.user$.pipe(
            map(user => {
                if (user) { return true; }

                this.router.navigate(['/login']);
                return false;
            })
        );
    }
}
