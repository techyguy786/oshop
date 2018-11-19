import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  categories$;

  constructor(
    productService: ProductService,
    categoryService: CategoryService
  ) {
    this.products$ = productService.getAll().valueChanges();
    this.categories$ = categoryService.getAll().valueChanges();
  }

}
