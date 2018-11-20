import { Product } from './models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { take } from 'rxjs/operators';

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

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  // if we use async on method, it means it is returning Promise
  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      return cartId;
    }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<any>('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(
      take(1)
    ).subscribe((item: any) => {
      if (item.key != null) {
        item$.update({ quantity: (item.payload.val().quantity || 0) + 1 });
      } else {
        item$.set({ product: product, quantity: 1 });
      }
    });
  }
}
