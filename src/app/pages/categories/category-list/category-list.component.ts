import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      c => {this.categories = c, console.log(this.categories)},
      error => alert('Erro ao carregar a lista')
    )
  }

  deleteCategory(category: Category) {
    const deveExcluir = confirm('Deseja realmente excluir este item?');
    if (deveExcluir) {
      this.categoryService.delete(category.id!).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        () => alert("Erro ao tentar excluir!")
        )
    }
  }

  deleteCategory_sintaxe2(category: Category) {
    this.categoryService.delete(category.id!).subscribe(resp => {
      this.categories = this.categories.filter(element => element != category);
    }, err => {
      alert("Erro ao tentar excluir!");
    }
    )
  }

}
