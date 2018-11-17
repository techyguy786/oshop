import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  // no access modifier because we just want to use it in the constructor,
  // even not in the class
  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories().valueChanges();
  }

  ngOnInit() {
  }

}
