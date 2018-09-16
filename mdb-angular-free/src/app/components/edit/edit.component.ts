import { CategoryDataService } from '../../model/categories/category-data.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../todos/todo';
import { TodoDataService } from '../../todos/todo-data.service';
import { Category } from '../../model/categories/category';
import 'rxjs/add/operator/map';
import { User } from '../../model/user/user';
import { Project } from '../../model/project/project';
import { ActivatedRoute } from '@angular/router';




export interface Article {
    author: string;
    title: string;
    body: string;
    published: Date;
}


@Component({
    selector: 'mdb-edit',
    templateUrl: 'edit.component.html',
    styleUrls: ['edit.component.css'],
    providers: [TodoDataService, CategoryDataService]

})

export class EditComponent implements OnInit {
    myUser = localStorage.getItem("user");
    newTodo: Todo = new Todo();
    newCategory: Category = new Category();
    selectedCategory: Category;
    testAnas;
    newUser: User = new User();
    myMenuItem: string;
    projectId: string =""; 

    constructor(private todoDataService: TodoDataService, private categoryDataService: CategoryDataService, private route: ActivatedRoute) {
        this.myMenuItem = 'tasks';
        this.start();
        const projectIdInParam: string = this.route.snapshot.queryParamMap.get('projectId');
        this.projectId = projectIdInParam; 
    }

    ngOnInit() {
        const projectIdInParam: string = this.route.snapshot.queryParamMap.get('projectId');
        this.projectId = projectIdInParam; 
    }



    selectMenu(selectedMenu: string) {
        this.myMenuItem = selectedMenu;
    }

    addTodo() {
        this.newTodo.category = this.selectedCategory.id;
        this.todoDataService.addTodo(this.newTodo);
        this.newTodo = new Todo();
        console.log(this.todos);
    }

    addUser() {
        // this.newUser
        let savedUser = new User();
        savedUser = this.newUser;
        this.selectedCategory.users.push(savedUser);
        this.categoryDataService.updateCategoryById(this.selectedCategory.id, { 'users': this.selectedCategory.users });
        this.categoryDataService.addUserToCategory(this.selectedCategory.id, savedUser);
        this.newUser = new User();
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

    get usersList() {
        return this.selectedCategory.users;
    }

    countTodosByCat(id: number) {
        return this.todoDataService.getTodoByCategory(id).length;
    }

    addCategory() {
        this.newCategory.progress = 40;
        this.newCategory.users = [];
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
    }


    start() {
        this.myUser = "";
        let newProject = new Project();
        let initCat = new Category();

        initCat = { 'name': '1. Plan des loges', 'id': null, 'progress': 23, 'users': [], 'project': newProject };
        this.addInitialCategory(initCat);
        initCat = { 'name': '2. Fill reservoir', 'id': null, 'progress': 63, 'users': [], 'project': newProject };
        this.addInitialCategory(initCat);
        initCat = { 'name': '3. Replace tank', 'id': null, 'progress': 23, 'users': [], 'project': newProject };
        this.addInitialCategory(initCat);
        initCat = { 'name': '4. Deliver boost', 'id': null, 'progress': 23, 'users': [], 'project': newProject };
        this.addInitialCategory(initCat);
        initCat = { 'name': '5. Increase gear flexibility', 'id': null, 'progress': 23, 'users': [], 'project': newProject };
        this.addInitialCategory(initCat);

        let initTodo = new Todo();
        initTodo = { 'title': 'Une copie des plans est disponible dns les loges', 'complete': false, 'id': null, category: 1 };
        this.addInitialTodo(initTodo);
        initTodo = { 'title': 'Task2', 'complete': true, 'id': null, category: 2 };
        this.addInitialTodo(initTodo);
        initTodo = { 'title': 'Task3', 'complete': true, 'id': null, category: 1 };
        this.addInitialTodo(initTodo);

    }

}