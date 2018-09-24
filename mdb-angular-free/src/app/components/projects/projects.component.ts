import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/project/project';
import { ProjectServiceService } from '../../model/project/project-service.service';
import { Router } from '@angular/router';

//import * as $ from 'jquery';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectServiceService]

})
export class ProjectsComponent implements OnInit {
  myProjects: Project[];

  constructor(private projectService: ProjectServiceService, private router: Router) {
    this.myProjects = projectService.allProjects;
  }


  ngOnInit(): void {
  }

  logAllProjects() {
    this.projectService.getJSON();
  }

  openProject(id: string) {

    this.projectService.getJSON();
    this.router.navigateByUrl('/singleproject?projectid=' + id);
  }

  editProject(id: String) {
    this.router.navigateByUrl('/edit-project?projectid=' + id);
  }

  getNumberProjectByPhase(phase: number) {
    let filteredProjects = this.myProjects.filter((project: Project) => project.phase == phase);
    return filteredProjects.length;
  }

  getRelativeNumberProjectByPhase(phase: number) {
    let totalprojects = this.myProjects.length;
    let filteredProjects = this.myProjects.filter((project: Project) => project.phase == phase);
    return filteredProjects.length / totalprojects * 100;
  }


}