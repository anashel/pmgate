import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user/user';
import { UserDataService } from '../../model/user/user-data.service';
import { Project } from '../../model/project/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../../model/project/project-service.service';
import { Topic } from '../../model/topics/topic';
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
  selectedTopicProgress: number;
  progressColor = 'dribbble';

  constructor(private router: Router, private userDataService: UserDataService, private projectService: ProjectServiceService, private route: ActivatedRoute) {
    this.myUser = userDataService.getPrincipal();
    this.myProject = new Project();
    const projectIdInParam: string = this.route.snapshot.queryParamMap.get('projectid');
    this.myProject = projectService.getProject(+projectIdInParam);
    this.newTopic = new Topic();
    this.newCriteria = new Criteria();
    this.selectedTopic = null;
    this.selectedTopicProgress = 0;
    //set up selected section  and phase
    this.myMenuItem = "topics";
    this.selectedPhase = this.myProject.phase;
    this.listUsers = userDataService.users;
    this.myTopics = this.myProject.topics.filter((topic: Topic) => topic.phase == this.selectedPhase);
  }

  ngOnInit() {
  }

  /**
   * Verify if the user can see this project
   */
  isAllowedProject() {
    let resp = this.projectService.isMember(this.myUser, this.myProject);
    return resp || (this.myUser.roleUser == "admin");
  }


  /**
   * 
   */
  get allMembers(): User[] {
    let superArray: User[];
    superArray = this.myProject.PM.concat(this.myProject.SEint).concat(this.myProject.SEext).concat(this.myProject.TC).concat(this.myProject.SWFT).concat(this.myProject.CCM).concat(this.myProject.QM).concat(this.myProject.SM);
    return superArray;
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
    this.updateTaskProgress();
    this.selectedTopic.status = "pending";
  }

  validateTopic() {
    this.updateTaskProgress();
    this.selectedTopic.status = "open";
  }


  closeTopic() {
    this.updateTaskProgress();
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
   * Toggle topic selection
   * @param topic 
   */
  onSelectTopic(topic: Topic) {
    this.selectedTopic = topic;
    console.log(this.selectedTopic);
    this.updateTaskProgress();
  }

  /**
   * Update the task progress from the selected topic
   */
  updateTaskProgress() {
    if (this.selectedTopic != null)
      this.selectedTopicProgress = this.getTaskProgress();
  }

  /**
   * Get the total of tasks in a project
   */
  getTotalCriteriaCount(): number {
    let count: number = 0;
    let thisPhase = this.selectedPhase;
    this.myProject.topics.forEach(function (topic: Topic) {
      if (topic.phase == thisPhase) {
        topic.criterias.forEach(function (criteria: Criteria) {
          count++;
        })
      }
    });
    return count;
  }


  /**
   * Get the total of tasks in a project that are completed
   */
  getCompletedTaskCount(): number {
    let count: number = 0;
    let thisPhase = this.selectedPhase;
    this.myProject.topics.forEach(function (topic: Topic) {
      if (topic.phase == thisPhase) {
        topic.criterias.forEach(function (criteria: Criteria) {
          if (criteria.status == "ok")
            count++;
        })
      }
    });
    return count;
  }


  /**
   * Get the total of tasks in a project
   */
  getTodoTaskCount(): number {
    let count: number = 0;
    let thisPhase = this.selectedPhase;
    this.myProject.topics.forEach(function (topic: Topic) {
      if (topic.phase == thisPhase) {
        topic.criterias.forEach(function (criteria: Criteria) {
          if (criteria.status == "nok")
            count++;
        })
      }
    });
    return count;
  }

  /**
 * Get the total of tasks in a project by Priority and Status
 */
  getTaskCountByPriorityAndStatus(priority: string, status: string): number {
    let count: number = 0;
    let thisPhase = this.selectedPhase;
    this.myProject.topics.forEach(function (topic: Topic) {
      if (topic.phase == thisPhase) {
        topic.criterias.forEach(function (criteria: Criteria) {
          if (criteria.status == status && criteria.priority == priority)
            count++;
        })
      }
    });
    return count;
  }

  /**
   * Get the total of tasks todo in a topic
   */
  getTodoTaskCountInTopic(topic: Topic): number {
    let count: number = 0;
    let thisPhase = this.selectedPhase;
    if (topic.phase == thisPhase) {
      topic.criterias.forEach(function (criteria: Criteria) {
        if (criteria.status == "nok")
          count++;
      })
    };

    return count;
  }


  /**
   * Get total progress
   */
  get criteriaProgressTotal(): number {
    let doneCriteriaLow: number = this.getTaskCountByPriorityAndStatus("low", "ok");
    let doneCriteriaHigh: number = this.getTaskCountByPriorityAndStatus("high", "ok");
    let todoCriteriaLow: number = this.getTaskCountByPriorityAndStatus("low", "nok");
    let todoCriteriaHigh: number = this.getTaskCountByPriorityAndStatus("high", "nok");
    let totalCriteria: number = (doneCriteriaHigh * 5) + doneCriteriaLow + (todoCriteriaHigh * 5) + todoCriteriaLow;
    let completedCriteria: number = (doneCriteriaHigh * 5) + doneCriteriaLow;
    return completedCriteria / totalCriteria * 100;
  }


  /**
   * calculate progress of tasks
   */
  getTaskProgress(): number {
    let lowPriority: Criteria[] = this.selectedTopic.criterias.filter((criteria: Criteria) => criteria.priority == 'low');
    let lowPriorityCount = lowPriority.length;
    let highPriority: Criteria[] = this.selectedTopic.criterias.filter((criteria: Criteria) => criteria.priority == 'high');
    let highPriorityCount = highPriority.length;

    let lowPriorityCompleted: Criteria[] = this.selectedTopic.criterias.filter((criteria: Criteria) => criteria.priority == 'low' && criteria.status == 'ok');
    let lowPriorityCompletedCount = lowPriorityCompleted.length;
    let highPriorityCompleted: Criteria[] = this.selectedTopic.criterias.filter((criteria: Criteria) => criteria.priority == 'high' && criteria.status == 'ok');
    let highPriorityCompletedCount = highPriorityCompleted.length;

    let doneCount = (highPriorityCompletedCount * 5) + lowPriorityCompletedCount;
    let totalCount = (highPriorityCount * 5) + lowPriorityCount;
    return doneCount / totalCount * 100;
  }

  /**
   * Select a phase in the stepper and setup the topics in that phase
   * @param phase 
   */
  selectPhase(phase: number) {
    this.updateTaskProgress();
    this.selectedPhase = phase;
    this.myTopics = this.myProject.topics.filter((topic: Topic) => topic.phase == phase);
    this.selectedTopic = null;
  }

  /**
   * Select the menu item in the summary box (topic, risk, issues)
   * @param selectedMenu 
   */
  selectMenu(selectedMenu: string) {
    this.updateTaskProgress();
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

  /**
   * go to edit component
   */
  editProject() {
    this.router.navigateByUrl('/edit-project?projectid=' + this.myProject.id);
  }

  /**
   * Get the count of topics in the active project + selected phase
   */
  getNumberTopics() {
    let filteredTopics = this.myProject.topics.filter((topic: Topic) => topic.phase == this.selectedPhase);
    return filteredTopics.length;
  }

  /**
   * Go to next phase in the diagram
   */
  goToNextPhase() {
    this.updateTaskProgress();
    this.myProject.phase++;
    this.selectedPhase++;
    this.myTopics = this.myProject.topics.filter((topic: Topic) => topic.phase == this.selectedPhase);
    this.selectedTopic = null;
  }

  /**
   * Return to previous phase
   */
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
    return this.selectedTopic.status == 'new' || this.selectedTopic.status == 'pending';
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
   * 
   * @param criteria Complete a criteria
   */
  toggleCriteria(criteria: Criteria) {
    let today = new Date().toLocaleDateString("EN-GB"); 
    if (criteria.status == 'ok') { 
      criteria.status = 'nok';
      criteria.comment += "\nCancelled on " + today + " by " + this.myUser.username;
    }
    else if (criteria.status == 'nok') {
      criteria.status = 'ok';
      criteria.comment += "\nCompleted on " + today + " by "+ this.myUser.username; 
    }
    this.updateTaskProgress();
    this.projectService.updateProject(this.myProject);
  }

  /**
   * Printing PDF
   */
  public captureScreen() {
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

  /**
   * verify if actual user is a PM 
   */
  isPM() {
    let isInPMArray = this.myProject.PM.find((member: User) => member.id == this.myUser.id);
    return (isInPMArray != null || this.myUser.roleUser == 'admin');
  }
}
