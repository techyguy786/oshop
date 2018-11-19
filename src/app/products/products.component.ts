import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  constructor(
    productService: ProductService,
    categoryService: CategoryService,
    route: ActivatedRoute
  ) {
    productService.getAll().valueChanges().subscribe((products: Product[]) => {
      this.products = products;
    });
    this.categories$ = categoryService.getAll().snapshotChanges()
                          .pipe(
                            map(items => {
                              return items.map(a => {
                                const data = a.payload.val();
                                const key = a.payload.key;
                                return {key, ...data};
                              });
                            })
                          );

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) : this.products;
    });
  }

}
