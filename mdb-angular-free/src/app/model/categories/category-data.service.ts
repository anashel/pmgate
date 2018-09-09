import { Injectable } from '@angular/core';
import { Category } from './category';
import { User } from '../user/user';





/*interface UserResponse {
  login: string;
  bio: string;
  company: string;
}*/



@Injectable()
export class CategoryDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId = 0;

  // Placeholder for category's
  categories: Category[] = [];
  myArrays = [];
  myCats;
  //private categoriesURL = "http://falling-surf-6268.getsandbox.com/heldlo";

  constructor() {
    this.populateCategories();
    this.testService();

  }



  callRestService() {
    /*this.http.get<Category[]>(this.categoriesURL).subscribe(data => {
      this.categories = data;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      })
      */

  };




  testService() {

  }




  // Simulate POST /categories
  addCategory(category: Category): CategoryDataService {
    if (!category.id) {
      category.id = ++this.lastId;
    }
    this.categories.push(category);
    return this;
  }

  addUserToCategory(categoryId:number, user:User){
    this.getCategoryById(categoryId).users.push(user); 
  }

  // Simulate DELETE /categories/:id
  deleteCategoryById(id: number): CategoryDataService {
    this.categories = this.categories
      .filter(category => category.id !== id);
    return this;
  }

  // Simulate PUT /categories/:id
  updateCategoryById(id: number, values: Object = {}): Category {
    let category = this.getCategoryById(id);
    if (!category) {
      return null;
    }
    Object.assign(category, values);
    return category;
  }

  // Simulate GET /categories
  getAllCategories(): Category[] {
    return this.categories;
  }

  // Simulate GET /categories/:id
  getCategoryById(id: number): Category {
    return this.categories
      .filter(category => category.id === id)
      .pop();
  }

  populateCategories() {

    this.callRestService();

  }

  generateId() {
    Math.floor((Math.random() * 100) + 1);
  }


}