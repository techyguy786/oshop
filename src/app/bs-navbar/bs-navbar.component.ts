import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  shoppingCartItemCount: number;
  subscription: Subscription;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    const cart$ = await this.cartService.getCart();

    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      // tslint:disable-next-line:forin
      for (const productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {

  }
}
