import { Product } from 'src/app/models/product';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['title', 'price', 'key'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productService: ProductService
  ) {
      this.subscription = this.productService.getAll().snapshotChanges()
        .pipe(
          map(items => {
            return items.map(a => {
              const data = a.payload.val();
              const key = a.payload.key;
              return {key, ...data};
            });
          })
        )
        .subscribe(products => {
          this.filteredProducts = this.products = products;
          this.dataSource = new MatTableDataSource<Product>(this.filteredProducts);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  }

  ngOnInit() {
  }

  applyFilter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
