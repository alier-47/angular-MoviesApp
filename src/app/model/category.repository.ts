import { Category } from "./category";

export class CategoryRepository {

    private categories: Category[];


    constructor(){
        this.categories = [
            {id: 1, name :"Macera"},
            {id: 2, name :"Romantik"},
            {id: 3, name :"Dram"},
            {id: 4, name :"Bilim Kurgu"}
              
          ]
    }

    getCategory() : Category[] {
        return this.categories;
    }
}