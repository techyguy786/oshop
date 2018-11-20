import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { switchMap, map } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    private shoppingCart: ShoppingCartService
  ) {
    // it is kinda ugly observable within observable
    productService.getAll().snapshotChanges()
      .pipe(
        map(items => {
          return items.map(a => {
            const data = a.payload.val();
            const key = a.payload.key;
            return {key, ...data};
          });
        })
      )
      .subscribe((products: Product[]) => {
        this.products = products;

        route.queryParamMap.subscribe(params => {
          this.category = params.get('category');

          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) : this.products;
        });
      });

    // With switchmap, we can switch observable to another observable,
    // now we no longer have nested observable
    // productService.getAll().valueChanges()
    //   .pipe(
    //     switchMap(products => {
    //       this.products = products;
    //       return route.queryParamMap;
    //     }),
    //   )
    //   .subscribe(params => {
    //       this.category = params.get('category');

    //       this.filteredProducts = (this.category) ?
    //         this.products.filter(p => p.category === this.category) : this.products;
    //       console.log(this.filteredProducts);
    //   });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCart.getCart()).valueChanges()
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
