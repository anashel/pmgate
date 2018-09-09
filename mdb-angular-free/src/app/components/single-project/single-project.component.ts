import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user/user';
import { UserDataService } from '../../model/user/user-data.service';
import { Project } from '../../model/project/project';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../../model/project/project-service.service';
import { Topic } from '../../model/topics/topic';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.scss'],
  providers: [ProjectServiceService, UserDataService]
})
export class SingleProjectComponent implements OnInit {

  myUser: User;
  myProject: Project;
  selectedPhase: number;
  myMenuItem: string;
  selectedTopic: Topic;
  myTopics: Topic[];
  newTopic: Topic;

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Loafers', 'Moccasins', 'Sneakers', 'Loafers', 'Moccasins', 'Sneakers', 'Loafers', 'Moccasins', 'Sneakers', 'Loafers', 'Moccasins', 'Sneakers', 'Loafers', 'Moccasins', 'Sneakers'];

  listUsers: User[];



  constructor(private userDataService: UserDataService, private projectService: ProjectServiceService, private route: ActivatedRoute) {


    this.myUser = userDataService.getPrincipal();
    this.myProject = new Project();

    const projectIdInParam: string = this.route.snapshot.queryParamMap.get('projectid');
    this.myProject = projectService.getProject(+projectIdInParam);
    console.log(this.myProject);
    this.myTopics = [];
    this.newTopic = new Topic();
    this.selectedTopic = new Topic();

    //set up selected section  and phase
    this.myMenuItem = "topics";
    this.selectedPhase = this.myProject.phase;
    this.listUsers = userDataService.users;
  }

  ngOnInit() {
  }

  testButton() {
    console.log(this.myProject);
  }

  addTopic() {
    console.log(this.newTopic);
    let toSaveTopic: Topic = this.newTopic;
    this.myTopics.push(toSaveTopic);

    this.newTopic = new Topic();


  }

  onSelectTopic(topic: Topic) {
    this.selectedTopic = topic;
  }
  //menu and phase jnitialization 
  selectPhase(phase: number) {
    this.selectedPhase = phase;
  }
  selectMenu(selectedMenu: string) {
    this.myMenuItem = selectedMenu;
  }

}
