import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  // no access modifier because we just want to use it in the constructor,
  // even not in the class
  constructor(
    categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories().snapshotChanges()
      .pipe(
        map(items => {
          return items.map(a => {
            const data = a.payload.val();
            const key = a.payload.key;
            return {key, ...data};
          });
        })
      );
  }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
  }
}
