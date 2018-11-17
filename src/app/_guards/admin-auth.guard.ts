import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
// If User is Admin or Not
export class AdminAuthGuard implements CanActivate {

    constructor(private auth: AuthService) {}

    canActivate(): Observable<boolean> {
        return this.auth.appUser$.pipe(
            map(appUser => appUser.isAdmin)
        );
    }
}
