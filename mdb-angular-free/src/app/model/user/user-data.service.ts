import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserDataService {

  users: User[] = [];
  allowedUsers: User[] = [];

  constructor() {
    this.allowedUsers = [];
    this.populateUsers();
/*
    let newUser: User = new User();
    newUser = { "id": 1, "username": "Anas Helalouch", "roleUser": "Analyste", "validated": false, "email": "Anas.Helalouch@gmail.com", "password": "admin" };
    this.allowedUsers.push(newUser);

    newUser = { "id": 2, "username": "Zinedine Zidane", "password": "admin", "roleUser": "Developeur", "validated": false, "email": "Zinedine.Zidane@gmail.com" };
    this.allowedUsers.push(newUser);

    newUser = { "id": 3, "userna
    me": "Raul Gonzalez", "password": "admin", "roleUser": "Attaquant", "validated": false, "email": "Raul.Gonzalez@gmail.com" };
    this.allowedUsers.push(newUser);

    newUser = { "id": 4, "username": "David Beckham", "password": "admin", "roleUser": "Project Manager", "validated": false, "email": "David.Beckham@gmail.com" };
    this.allowedUsers.push(newUser);

    newUser = { "id": 5, "username": "admin", "password": "admin", "roleUser": "Admin", "validated": false, "email": "Admin@gmail.com" };
    this.allowedUsers.push(newUser);
    */

   this.allowedUsers = require('../../../assets/data/users.json'); 

  }

  populateUsers() {
   /* let newUser: User = new User();
    newUser = { "id": 1, "username": "Anas Helalouch", "roleUser": "Analyste", "validated": false, "email": "Anas.Helalouch@gmail.com", "password": "admin" };
    this.users.push(newUser);

    newUser = { "id": 2, "username": "Zinedine Zidane", "password": "admin", "roleUser": "Developeur", "validated": false, "email": "Zinedine.Zidane@gmail.com" };
    this.users.push(newUser);

    newUser = { "id": 3, "username": "Raul Gonzalez", "password": "admin", "roleUser": "Attaquant", "validated": false, "email": "Raul.Gonzalez@gmail.com" };
    this.users.push(newUser);

    newUser = { "id": 4, "username": "David Beckham", "password": "admin", "roleUser": "Project Manager", "validated": false, "email": "David.Beckham@gmail.com" };
    this.users.push(newUser);

    newUser = { "id": 5, "username": "admin", "password": "admin", "roleUser": "Admin", "validated": false, "email": "Admin@gmail.com" };
    this.users.push(newUser);*/

    this.users = require('../../../assets/data/users.json'); 
  }

  getPrincipal() {
    var user: User;
    user = JSON.parse(localStorage.getItem("principal"));
    return user;

  }


  addUser(user: User): UserDataService {
    if (!user.id) {
      user.id = this.generateId();
    }
    this.users.push(user);
    return this;
  }

  generateId() {
    return Math.floor((Math.random() * 100) + 1);
  }


  verifyCredentials(username: string, password: string) {

    var selectedUser = this.allowedUsers.filter(function (item) {
      return item.username == username;
    })[0];

    if (selectedUser == null) {
      return null;
    }
    else {
      if (selectedUser.password == password)
        return selectedUser;
      return null;
    }

  }

}
