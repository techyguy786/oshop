import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(private afAuth: AngularFireAuth) {
    // To know about logout is working or not.
    afAuth.authState.subscribe(x => console.log(x));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
