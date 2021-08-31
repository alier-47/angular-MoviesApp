import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { CategoryRepository } from '../model/category.repository';
import { CategoryService } from '../services/category.service';
import { MovieService } from '../services/movie.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService, MovieService]
})
export class CategoryComponent implements OnInit {

  categories : Category[] = [];
  categoryRepository : CategoryRepository;
  selectedCategory : Category = null;

  constructor(private categoryService : CategoryService, private movieS : MovieService) { 
    //this.categoryRepository = new CategoryRepository();
    //this.categories = this.categoryRepository.getCategory();
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }

  displayAll = true

  selectCategory(item? : Category){
    if(item){
      this.selectedCategory = item;
      this.displayAll = false;
    }else {
      this.selectedCategory = null;
      this.displayAll = true
    }    

  }

}
