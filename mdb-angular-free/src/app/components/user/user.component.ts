import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user/user';
import { UserDataService } from '../../model/user/user-data.service';
import { Role } from '../../model/roles/role';
import { RoleDataService } from '../../model/roles/role-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ UserDataService, RoleDataService]
})
export class UserComponent implements OnInit {
  dataset: User[];
  selectedUser:User; 
  roles: Role[]; 
    
  constructor(private userDataService:UserDataService, private roleDataService:RoleDataService) {
    this.roles = roleDataService.roles; 
   }

  ngOnInit() {
    //initializing the array
    this.dataset = [];
    this.selectedUser = new User(); 
  

    //creating random set of user (TODO REPLACE BY REST CALL)
   /* let newUser: User = new User();
    newUser = { "id": 1, "username": "Anas Helalouch", "roleUser": "Analyste", "validated": false, "email":"Anas.Helalouch@gmail.com", "password":"admin"};
    this.dataset.push(newUser); 

    newUser = { "id": 2, "username": "Zinedine Zidane", "password":"admin", "roleUser": "Developeur", "validated": false,  "email":"Zinedine.Zidane@gmail.com"};
    this.dataset.push(newUser);

    newUser = { "id": 3, "username": "Raul Gonzalez", "password":"admin",  "roleUser": "Attaquant" , "validated": false,  "email":"Raul.Gonzalez@gmail.com"};
    this.dataset.push(newUser);

    newUser = { "id": 4, "username": "David Beckham",  "password":"admin", "roleUser": "Project Manager" , "validated": false,  "email":"David.Beckham@gmail.com"};
    this.dataset.push(newUser);
*/
    this.dataset = this.userDataService.users;
  }

  editUser(user:User){
   console.log(user);
   this.selectedUser = user; 
   
   
  }

  validateUser(user:User)
  {
    console.log(user); 
    this.dataset[this.dataset.indexOf(user)].validated = true; 
  }

  invalidateUser(user:User)
  {
    console.log(user); 
    this.dataset[this.dataset.indexOf(user)].validated = false; 
  }

  saveUser(user:User)
  {
    this.dataset[this.dataset.indexOf(user)].email = this.selectedUser.email; 
    console.log(this.selectedUser);
    
  }
}
