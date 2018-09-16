import { CategoryDataService } from './model/categories/category-data.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from './todos/todo';
import { TodoDataService } from './todos/todo-data.service';
import { Category } from './model/categories/category';
import { MessageDataService } from './model/message/message-data.service';
import { OrderComponent } from './components/orders/orders.component';
import { MenuItemService } from './model/menu-item/menuitem-data.service';
import { UserDataService } from './model/user/user-data.service';
import { User } from './model/user/user';

@Component({
  selector: 'mdb-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [TodoDataService, CategoryDataService, MessageDataService, OrderComponent, MenuItemService, UserDataService]

})

export class AppComponent implements OnInit {


  newTodo: Todo = new Todo();
  newCategory: Category = new Category();
  selectedCategory: Category;
  loggedIn: Boolean;
  navigat: String;
  valuepassword;
  emailValue;
  principal: User;

  constructor(private todoDataService: TodoDataService, private categoryDataService: CategoryDataService, private userDataService: UserDataService) {
    this.loggedIn = false;
    this.navigat = 'edit';
    this.principal = userDataService.getPrincipal();
  }

  selectTab(tab: String) {
    this.navigat = tab;
  }

  addTodo() {
    this.newTodo.category = this.selectedCategory.id;
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();

    console.log(this.todos);
  }

  loginUser() {
    var img = require('../assets/data/projects.json'); 
    console.log(img);
    
    console.log(this.valuepassword);
    console.log(this.emailValue);
    console.log(this.newTodo.title);
    // if (this.valuepassword == 'admin' && this.emailValue == 'admin') {
    let allowed = this.userDataService.verifyCredentials(this.emailValue, this.valuepassword)

    if (allowed != null) {
      this.loggedIn = true;
      console.log(this.loggedIn);
      localStorage.setItem("principal", JSON.stringify(allowed));
      this.principal = this.userDataService.getPrincipal();
    }
    else {
      console.log("wrong user");

    }
    // }
  }
  verifyCredentials2() {
    return true;
  }
  logoutUser() {
    this.loggedIn = false;
    console.log(this.loggedIn);
    console.log(this.userDataService.getPrincipal().username);
    localStorage.clear();
  }



  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }

  get todosForCat() {
    return this.todoDataService.getTodoByCategory(this.selectedCategory.id);
  }

  countTodosByCat(id: number) {
    return this.todoDataService.getTodoByCategory(id).length;
  }

  addCategory() {
    this.categoryDataService.addCategory(this.newCategory);
    this.newCategory = new Category();
  }

  removeCategory(category) {
    this.categoryDataService.deleteCategoryById(category.id);
  }

  get categories() {
    return this.categoryDataService.getAllCategories();
  }

  categoryById(id: number) {
    return this.categoryDataService.getCategoryById(id);
  }

  addInitialCategory(category) {
    this.categoryDataService.addCategory(category);
  }

  addInitialTodo(todo) {
    this.todoDataService.addTodo(todo);
  }


  onSelect(category: Category): void {
    this.selectedCategory = category;
    console.log(category);

  }

  ngOnInit() {
    //this.principal = this.userDataService.getPrincipal();
    /*  const my_observable = Observable.of(42);
  
      my_observable.subscribe((value) => {
        console.log(value);
      }, (error) => {
        console.log(error);
      }, () => {
        console.log('Finis !');
      });
  
     */


  }

}