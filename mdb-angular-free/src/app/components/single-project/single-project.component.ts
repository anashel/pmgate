import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user/user';
import { UserDataService } from '../../model/user/user-data.service';
import { Project } from '../../model/project/project';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../../model/project/project-service.service';
import { Topic } from '../../model/topics/topic';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Criteria } from '../../model/criterias/criteria';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  


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
  newCriteria: Criteria;
  listUsers: User[];

  progressColor = 'dribbble';

  constructor(private userDataService: UserDataService, private projectService: ProjectServiceService, private route: ActivatedRoute) {
    this.myUser = userDataService.getPrincipal();
    this.myProject = new Project();
    const projectIdInParam: string = this.route.snapshot.queryParamMap.get('projectid');
    this.myProject = projectService.getProject(+projectIdInParam);
    this.newTopic = new Topic();
    this.newCriteria = new Criteria();
    this.selectedTopic = null;
    //set up selected section  and phase
    this.myMenuItem = "topics";
    this.selectedPhase = this.myProject.phase;
    this.listUsers = userDataService.users;
    this.myTopics = this.myProject.topics.filter((topic: Topic) => topic.phase == this.selectedPhase);
  }

  ngOnInit() {
  }


  initialize() {
  }

  get value() {
    return this.getTopicProgressValue();
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
  }

  validateTopic() {
    this.selectedTopic.status = "open";
  }


  closeTopic() {
    this.selectedTopic.status = "closed";
  }

  testButton() {
  }

  addTopic() {
    let toSaveTopic: Topic = this.newTopic;
    toSaveTopic.phase = this.selectedPhase;
    toSaveTopic.criterias = [];
    this.myProject.topics.push(toSaveTopic);
    this.newTopic = new Topic();

    this.myTopics = this.myProject.topics.filter((topic: Topic) => topic.phase == this.selectedPhase);
  }

  /**
   * 
   * @param topic 
   */
  onSelectTopic(topic: Topic) {
    this.selectedTopic = topic;
    console.log(this.selectedTopic);
  }

  /**
   * Select a phase in the stepper and setup the topics in that phase
   * @param phase 
   */
  selectPhase(phase: number) {
    this.selectedPhase = phase;
    this.myTopics = this.myProject.topics.filter((topic: Topic) => topic.phase == phase);
    this.selectedTopic = null;
  }

  /**
   * Select the menu item in the summary box (topic, risk, issues)
   * @param selectedMenu 
   */
  selectMenu(selectedMenu: string) {
    this.myMenuItem = selectedMenu;
  }

  /**
   * Get percentage of progress
   * Method: Take all closed topics, get all topics, divide first by second. 
   */
  getTopicProgressValue() {
    let x: number = this.getNumberTopicByStatus("closed");
    let y: number = this.myProject.topics.filter((topic: Topic) => topic.phase == this.selectedPhase).length;
    let divided = x / y * 100;
    return Math.round(divided);
  }

  /**
   * 
   * @param status 
   */
  getNumberTopicByStatus(status: String) {
    let filteredTopics: Topic[] = [];
    filteredTopics = this.myProject.topics.filter((topic: Topic) => topic.status == status && topic.phase == this.selectedPhase);
    return filteredTopics.length;

  }

  getNumberTopics() {
    let filteredTopics = this.myProject.topics.filter((topic: Topic) => topic.phase == this.selectedPhase);
    return filteredTopics.length;
  }

  goToNextPhase() {
    this.myProject.phase++;
    this.selectedPhase++;
    this.myTopics = this.myProject.topics.filter((topic: Topic) => topic.phase == this.selectedPhase);
    this.selectedTopic = null;
  }

  goToPreviousPhase() {
    this.myProject.phase--;
    this.selectedPhase--;
    this.myTopics = this.myProject.topics.filter((topic: Topic) => topic.phase == this.selectedPhase);
    this.selectedTopic = null;
  }

  addCriteria() {
    let that = this;
    let toSaveCriteria = this.newCriteria;
    this.selectedTopic.criterias.push(toSaveCriteria);
    this.newCriteria = new Criteria();
  }

  removeCriteria(criteria: Criteria) {
    let toDeleteCriteria = this.selectedTopic.criterias.indexOf(criteria);
    this.selectedTopic.criterias.splice(toDeleteCriteria, 1);
  }

  /**
   * Validation rules for criteria
   */

  canEditCriterias() {
    return true;
  }

  /**
   * Verify if the criteria contains enough information. 
   */
  isNewCriteriaComplete() {
    let c = this.newCriteria;
    if (c.name != null && c.owner != null && c.startdate != null && c.enddate != null) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Printing PDF
   */


  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
    
      const contentDataURL = canvas.toDataURL('pdf')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
    //  pdf.addHTML(contentDataURL, 'pdf', 0, position, imgWidth, imgHeight);

   pdf.addImage(contentDataURL, 'pdf', 0, position, imgWidth, imgHeight)  
      pdf.save('ProjectReport.pdf'); // Generated PDF   
    });  
    

    
  }  
}
