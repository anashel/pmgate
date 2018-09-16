import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user/user';
import { UserDataService } from '../../model/user/user-data.service';
import { Project } from '../../model/project/project';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../../model/project/project-service.service';
import { Topic } from '../../model/topics/topic';
import { MatProgressBarModule } from '@angular/material/progress-bar';





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

  get value() {
    return this.getTopicProgressValue();
  }

  progressColor = 'dribbble';

  constructor(private userDataService: UserDataService, private projectService: ProjectServiceService, private route: ActivatedRoute) {


    this.myUser = userDataService.getPrincipal();
    this.myProject = new Project();

    const projectIdInParam: string = this.route.snapshot.queryParamMap.get('projectid');
    this.myProject = projectService.getProject(+projectIdInParam);

    this.myTopics = this.myProject.topics;
    this.newTopic = new Topic();
    this.selectedTopic = new Topic();

    //progress: 
    // let Filt
    // filteredTopics = this.myTopics.filter((topic: Topic) => topic.status == status && topic.phase == this.selectedPhase);


    //set up selected section  and phase
    this.myMenuItem = "topics";
    this.selectedPhase = this.myProject.phase;
    this.listUsers = userDataService.users;

    //progress:
    //this.value =  this.getTopicProgressValue();

  }

  ngOnInit() {


    this.initialize();

  }

  initialize() {
    this.myUser = this.userDataService.getPrincipal();
    this.myProject = new Project();

    const projectIdInParam: string = this.route.snapshot.queryParamMap.get('projectid');
    this.myProject = this.projectService.getProject(+projectIdInParam);

    this.myTopics = this.myProject.topics;
    this.newTopic = new Topic();
    this.selectedTopic = new Topic();


    //set up selected section  and phase
    this.myMenuItem = "topics";
    this.selectedPhase = this.myProject.phase;
    this.listUsers = this.userDataService.users;
  }


  isSelected(member: User) {
    return this.selectedTopic.members.indexOf(member) == -1;
  }

  addMember(member: User) {
    if (this.selectedTopic.members.indexOf(member) == -1) {
      this.selectedTopic.members.push(member);
      this.userDataService.allowedUsers;
      this.projectService.allProjects;
    }

  }
  removeMember(member: User) {
    let toDelete = this.selectedTopic.members.indexOf(member);
    this.selectedTopic.members.splice(toDelete, 1);
  }

  submitTopicForValidation() {
    this.selectedTopic.status = "pending";
    console.log(this.myProject);

  }

  validateTopic() {
    this.selectedTopic.status = "open";
  }


  closeTopic() {
    this.selectedTopic.status = "closed";
  }

  testButton() {
    console.log(this.myProject);
  }

  addTopic() {
    console.log(this.newTopic);
    let toSaveTopic: Topic = this.newTopic;
    toSaveTopic.phase = this.selectedPhase;
    this.myProject.topics.push(toSaveTopic);

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
    console.log("My Menu Item Click: ---");

    console.log(this.myProject);
    console.log(this.myTopics);

  }


  getTopicProgressValue() {
    let x: number = this.getNumberTopicByStatus("closed");

    let y: number = this.myProject.topics.filter((topic: Topic) => topic.phase == this.selectedPhase).length;
    console.log("Number of total topics phase 2");

    console.log(y);
    let divided = x / y * 100;
    console.log("divided: ");

    console.log(divided);

    return divided;
  }

  getNumberTopicByStatus(status: String) {
    let filteredTopics: Topic[] = [];
    //console.log(this.myProject);

    filteredTopics = this.myProject.topics.filter((topic: Topic) => topic.status == status && topic.phase == this.selectedPhase);
    console.log("Filter by status: ");

    console.log(filteredTopics);

    return filteredTopics.length;

  }

  getNumberTopics() {


    let filteredTopics = this.myProject.topics.filter((topic: Topic) => topic.phase == this.selectedPhase);


    return filteredTopics.length;

  }

  getTopicProgressColor() {
    return "Accent";
  }

}
