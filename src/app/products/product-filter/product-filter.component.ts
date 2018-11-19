import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;

  constructor(categoryService: CategoryService) {
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
  }

  ngOnInit() {
  }

}
