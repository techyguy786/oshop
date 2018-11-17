import { AngularFireObject } from 'angularfire2/database';
import { UserService } from './../user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';

@Injectable()
// If User is Admin or Not
export class AdminAuthGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private userService: UserService
    ) {}

    canActivate(): Observable<boolean> {
        return this.auth.user$
        .pipe(
            switchMap(user => this.userService.get(user.uid).valueChanges()),
            map(appUser => appUser.isAdmin)
        );
    }
}
