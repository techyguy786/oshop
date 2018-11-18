import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
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
    this.router.navigate(['/admin/products']);
  }
}
