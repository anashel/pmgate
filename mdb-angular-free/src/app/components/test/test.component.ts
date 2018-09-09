import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user/user';
import { ProjectServiceService } from '../../model/project/project-service.service';
import { Router } from '@angular/router';
import { UserDataService } from '../../model/user/user-data.service';
import { Project } from '../../model/project/project';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'], 
  providers: [ProjectServiceService, UserDataService]
})
export class TestComponent implements OnInit {
  dataset: User[];
  selectedUsers: User[];
  projectManagers: User[];
  selectedManager: any;
  newProject: Project = new Project(); 
  projectName :string; 


  constructor(private projectService :ProjectServiceService, private router: Router, private userDataService: UserDataService) {
    this.projectName=""; 
   }

  ngOnInit() {
    //initializing the array
    this.dataset = [];
    this.selectedUsers = [];
    this.projectManagers = [];
    this.userDataService.populateUsers();
    this.dataset = this.userDataService.users;

/*
    //creating random set of user (TODO REPLACE BY REST CALL)
    let newUser: User = new User();
    newUser = { "id": 1, "username": "Anas Helalouch", "roleUser": "Analyste", "validated": false, "email":"Anas.Helalouch@gmail.com", "password":"admin"};
    this.dataset.push(newUser); 

    newUser = { "id": 2, "username": "Zinedine Zidane", "password":"admin", "roleUser": "Developeur", "validated": false,  "email":"Zinedine.Zidane@gmail.com"};
    this.dataset.push(newUser);

    newUser = { "id": 3, "username": "Raul Gonzalez", "password":"admin",  "roleUser": "Attaquant" , "validated": false,  "email":"Raul.Gonzalez@gmail.com"};
    this.dataset.push(newUser);

    newUser = { "id": 4, "username": "David Beckham",  "password":"admin", "roleUser": "Project Manager" , "validated": false,  "email":"David.Beckham@gmail.com"};
    this.dataset.push(newUser);
*/

   

  }

  selectUser(user: User) {
    console.log(user.username);
    console.log(this.selectedUsers);

    if (this.selectedUsers.indexOf(user))
    this.selectedUsers.push(user);
  }
  
  removeUser(user:User){
    let indexToDelete= this.selectedUsers.indexOf(user); 
    this.selectedUsers.splice(indexToDelete, 1);
  }

  addManager(){
    console.log(this.selectedManager);
    
  }

  saveProject(){
    console.log(this.projectName);
    
    
    this.projectService.addProject(); 
    console.log("project saved");
    console.log(this.projectService.allProjects);
    this.router.navigateByUrl('/projects');
    
  }

  simpleCompare(item1, item2){
    return item1.type == item2.type; 
  }
}

