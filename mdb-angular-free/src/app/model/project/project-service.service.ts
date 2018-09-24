import { Injectable } from '@angular/core';
import { Project } from './project';
import { UserDataService } from '../user/user-data.service';
import { User } from '../user/user';
import { filter } from 'rxjs/operator/filter';

@Injectable()
export class ProjectServiceService {
  allProjects: Project[] = [];

  constructor() {
    this.allProjects = [];
    this.getAllProjects();
  }

  getAllProjects() {
    let newProject: Project = new Project(); 
    newProject.budget;
    let userDataService = new UserDataService();
    var allUsers: User[] = userDataService.users;


    this.allProjects = require('../../../assets/data/projects.json'); 
  }

     
  public isMember(user:User, project: Project) :boolean{
    let superArray:User[]; 
    superArray = project.PM.concat(project.SEint).concat(project.SEext).concat(project.TC).concat(project.SWFT).concat(project.CCM).concat(project.QM).concat(project.SM); 
    console.log(superArray);
    let filteredUser:User = superArray.find((toFindUser: User) => toFindUser.id == user.id);
    if (filteredUser == null)
    return false; 
    return true; 
}



  

  updateProject(inProject:Project){
    let filteredProject:Project = this.allProjects.find((project: Project) => project.id == inProject.id);
    let indexOfProject = this.allProjects.indexOf(filteredProject); 
    this.allProjects[indexOfProject] = inProject;
  }

  saveProject(project:Project) {
    let id = Math.floor((Math.random() * 100000000) + 1);
    project.id = id; 
    this.allProjects.push(project);
  }

  getJSON() {
    var projects = require('../../../assets/data/projects.json'); 
    console.log(projects);

  }

   getProject(inputId :number) : Project{
    return  this.allProjects.find(item => item.id === inputId);
   
  }


}
