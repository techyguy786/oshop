import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCart() {
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      // this.create().then(result => {
      //   localStorage.setItem('cartId', result.key);

      //   return this.getCart(result.key);
      // });

      // instead of using Promise, let's make our code more cleaner
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return this.getCart(result.key);
    } else {
      return this.getCart(cartId);
    }
  }
}
