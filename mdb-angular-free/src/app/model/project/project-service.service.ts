import { Injectable } from '@angular/core';
import { Project } from './project';
import { UserDataService } from '../user/user-data.service';
import { User } from '../user/user';

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
    let randomUser = allUsers[0];
    let randomStart = new Date("2015-03-25");
    let randomEnd = new Date("2018-02-11");
    newProject = {
      "id": 1, "name": "Maintenance Project PL124", "startdate": randomStart, "enddate": randomEnd,
      "type": "Maintenance", "description": "This projejct is to maintain secltion PL124", "PM": [randomUser],
      "SEint": [], "SEext": [], "TC": [], "SWFT": [], "CCM": [], "QM": [], "SM": [], "topics": [], "loges": [],
      "progress": 0, "budget": 2000000, "phase": 3
    };
    //this.allProjects.push(newProject);

    newProject = {
      "id": 2, "name": "Reparation Loges RP243", "startdate": randomStart, "enddate": randomEnd,
      "type": "Maintenance", "description": "This projejct is to maintain secltion PL124", "PM": [randomUser],
      "SEint": [], "SEext": [], "TC": [], "SWFT": [], "CCM": [], "QM": [], "SM": [], "topics": [], "loges": [],
      "progress": 0, "budget": 5000000, "phase": 1
    };
    //this.allProjects.push(newProject);

    newProject = {
      "id": 3, "name": "Clean Tunnels CT353", "startdate": randomStart, "enddate": randomEnd,
      "type": "Maintenance", "description": "This projejct is to maintain secltion PL124", "PM": [randomUser],
      "SEint": [], "SEext": [], "TC": [], "SWFT": [], "CCM": [], "QM": [], "SM": [], "topics": [], "loges": [],
      "progress": 0, "budget": 43000000, "phase": 0
    };
    // this.allProjects.push(newProject);

    this.allProjects = require('../../../assets/data/projects.json'); 
  }

  addProject() {
    let newProject: Project;
    let userDataService = new UserDataService();
    var allUsers: User[] = userDataService.users;
    let randomUser = allUsers[0];
    let randomStart = new Date("2015-03-25");
    let randomEnd = new Date("2018-02-11");
    let id = Math.floor((Math.random() * 100000000) + 1);
    newProject = {
      "id": id, "name": "New Project:  NP"+id, "startdate": randomStart, "enddate": randomEnd,
      "type": "Maintenance", "description": "Creation of new project here.", "PM": [randomUser],
      "SEint": [], "SEext": [], "TC": [], "SWFT": [], "CCM": [], "QM": [], "SM": [], "topics": [], "loges": [],
      "progress": 0, "budget": 14000000, "phase": 0
    };
    this.allProjects.push(newProject);
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
