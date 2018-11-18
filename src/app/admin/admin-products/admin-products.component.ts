import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getAll().snapshotChanges()
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
}
