import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../model/user/user';
import { UserDataService } from '../../model/user/user-data.service';
import { Project } from '../../model/project/project';
import { ProjectServiceService } from '../../model/project/project-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Loge } from '../../model/loges/loge';
import { Location } from "@angular/common";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'], 
  providers:[UserDataService, ProjectServiceService]
})
export class EditProjectComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  newProject: Project;
  formSubmitted: boolean = false;
  newLoge: Loge;

  //set FilteredList
  constructor(private location: Location, private route: ActivatedRoute, public snackBar: MatSnackBar, private userDataService: UserDataService, private projectService: ProjectServiceService, private router: Router) {
    //getProject from queryparam
    const projectIdInParam: string = this.route.snapshot.queryParamMap.get('projectid');
    this.newProject = projectService.getProject(+projectIdInParam);
    
    this.formSubmitted = false;
    this.newLoge = new Loge();
    this.FilteredPM = this.PMCtrl.valueChanges.pipe(
      startWith(null),
      map((pm: String | null) => pm ? this._filterPM(pm) : this.allPM.slice()));

    this.FilteredSEint = this.SEintCtrl.valueChanges.pipe(
      startWith(null),
      map((seint: String | null) => seint ? this._filterSEint(seint) : this.allSEint.slice()));

    this.FilteredSEext = this.SEextCtrl.valueChanges.pipe(
      startWith(null),
      map((seext: String | null) => seext ? this._filterSEext(seext) : this.allSEext.slice()));

    this.FilteredTC = this.TCCtrl.valueChanges.pipe(
      startWith(null),
      map((tc: String | null) => tc ? this._filterSEext(tc) : this.allTC.slice()));

    this.FilteredSWFT = this.SWFTCtrl.valueChanges.pipe(
      startWith(null),
      map((swft: String | null) => swft ? this._filterSWFT(swft) : this.allSWFT.slice()));

    this.FilteredCCM = this.CCMCtrl.valueChanges.pipe(
      startWith(null),
      map((ccm: String | null) => ccm ? this._filterCCM(ccm) : this.allCCM.slice()));

    this.FilteredQM = this.QMCtrl.valueChanges.pipe(
      startWith(null),
      map((qm: String | null) => qm ? this._filterQM(qm) : this.allQM.slice()));

    this.FilteredSM = this.SMCtrl.valueChanges.pipe(
      startWith(null),
      map((sm: String | null) => sm ? this._filterSM(sm) : this.allSM.slice()));
  }

  ngOnInit() {
    this.formSubmitted = false;
  }

  /* Validation */
  validName() {
    return !this.isEmpty(this.newProject.name);
  }

  validStartdate() {
    return this.validDate(this.newProject.startdate);
  }

  validEnddate() {
    return (this.validDate(this.newProject.startdate)) && (this.newProject.enddate > this.newProject.startdate);
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

  emptyArray(myArray) {
    if (myArray.length > 0) {
      return false;
    }
    else {
      return true;
    }
  }

  validDate(date) {
    if (!Date.parse(date)) {
      return false;
    }
    else {
      return true;
    }
  }

  validProject() {
    return (this.validName() &&
    this.validStartdate() &&
    this.validEnddate() &&
    !this.emptyArray(this.newProject.loges) &&
    !this.emptyArray(this.newProject.PM)   &&
    !this.emptyArray(this.newProject.SEext) && 
    !this.emptyArray(this.newProject.SEint) &&
    !this.emptyArray(this.newProject.TC) &&
    !this.emptyArray(this.newProject.SWFT) &&
    !this.emptyArray(this.newProject.CCM) &&
    !this.emptyArray(this.newProject.QM) &&
    !this.emptyArray(this.newProject.SM)
     );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  addLoge() {
    if (!this.isEmpty(this.newLoge.name)) {
      let toSaveLoge: Loge = this.newLoge;
      this.newProject.loges.push(toSaveLoge);
      this.newLoge = new Loge();
    }
  }

  removeLoge(ts: Loge) {
    let toDelete = this.newProject.loges.indexOf(ts)
    this.newProject.loges.splice(toDelete, 1);
  }

  updateProject() {
    this.formSubmitted = true;
    let toSaveProject: Project;
    console.log(this.newProject);
    
    toSaveProject = this.newProject;
    let validationValueProject = this.validProject(); 
    console.log(validationValueProject);
    
    if (validationValueProject)
    {
    this.projectService.updateProject(toSaveProject);
    //this.router.navigateByUrl('/projects');
    this.location.back();
    this.openSnackBar(toSaveProject.name, "Updated");
    }
  }


  /**Project Manager */

  //ListVariables
  PMCtrl = new FormControl();
  FilteredPM: Observable<string[]>;

  //Array of GET
  allPM: User[] = this.userDataService.users;

  //Capute HTML element
  @ViewChild('pmInput') pmInput: ElementRef;

  // Add an element
  addPM(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.PMCtrl.setValue(null);
  }

  // Select element in dropdown
  selectedPM(event: MatAutocompleteSelectedEvent): void {
    this.newProject.PM.push(event.option.value);
    this.pmInput.nativeElement.value = '';
    this.PMCtrl.setValue(null);
  }

  //remove element
  removePM(pm, indx): void {
    this.newProject.PM.splice(indx, 1);
  }


  //Filter
  private _filterPM(value: any): any[] {
    // return this.allFruits.filter(fruit => fruit.name.toLowerCase().includes(value.toLowerCase()));
    let dd = String(value);
    return this.allPM.filter(pm => pm.username.toLowerCase().includes(dd.toLowerCase()));
  }


  /**SEint */

  //ListVariables
  SEintCtrl = new FormControl();
  FilteredSEint: Observable<string[]>;

  //Array of GET
  allSEint: User[] = this.userDataService.users;

  //Capute HTML element
  @ViewChild('seintInput') seintInput: ElementRef;

  // Add an element
  addSEint(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our 
    if ((value || '').trim()) {

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.SEintCtrl.setValue(null);
  }

  // Select element in dropdown
  selectedSEint(event: MatAutocompleteSelectedEvent): void {
    this.newProject.SEint.push(event.option.value);
    this.seintInput.nativeElement.value = '';
    this.SEintCtrl.setValue(null);
  }

  //remove element
  removeSEint(seint, indx): void {
    this.newProject.SEint.splice(indx, 1);
  }


  //Filter
  private _filterSEint(value: any): any[] {
    // return this.allFruits.filter(fruit => fruit.name.toLowerCase().includes(value.toLowerCase()));
    let dd = String(value);
    return this.allSEint.filter(seint => seint.username.toLowerCase().includes(dd.toLowerCase()));
  }

  /**SEext */

  //ListVariables
  SEextCtrl = new FormControl();
  FilteredSEext: Observable<string[]>;

  //Array of GET
  allSEext: User[] = this.userDataService.users;

  //Capute HTML element
  @ViewChild('seextInput') seextInput: ElementRef;

  // Add an element
  addSEext(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our 
    if ((value || '').trim()) {

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.SEextCtrl.setValue(null);
  }

  // Select element in dropdown
  selectedSEext(event: MatAutocompleteSelectedEvent): void {
    this.newProject.SEext.push(event.option.value);
    this.seextInput.nativeElement.value = '';
    this.SEextCtrl.setValue(null);
  }

  //remove element
  removeSEext(seext, indx): void {
    this.newProject.SEext.splice(indx, 1);
  }


  //Filter
  private _filterSEext(value: any): any[] {
    let dd = String(value);
    return this.allSEext.filter(seext => seext.username.toLowerCase().includes(dd.toLowerCase()));
  }

  /** TC */

  //ListVariables
  TCCtrl = new FormControl();
  FilteredTC: Observable<string[]>;

  //Array of GET
  allTC: User[] = this.userDataService.users;

  //Capute HTML element
  @ViewChild('tcInput') tcInput: ElementRef;

  // Add an element
  addTC(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our 
    if ((value || '').trim()) {

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.TCCtrl.setValue(null);
  }

  // Select element in dropdown
  selectedTC(event: MatAutocompleteSelectedEvent): void {
    this.newProject.TC.push(event.option.value);
    this.tcInput.nativeElement.value = '';
    this.TCCtrl.setValue(null);
  }

  //remove element
  removeTC(tc, indx): void {
    this.newProject.TC.splice(indx, 1);
  }


  //Filter
  private _filterTC(value: any): any[] {
    let dd = String(value);
    return this.allTC.filter(tc => tc.username.toLowerCase().includes(dd.toLowerCase()));
  }

  /** SWFT */

  //ListVariables
  SWFTCtrl = new FormControl();
  FilteredSWFT: Observable<string[]>;

  //Array of GET
  allSWFT: User[] = this.userDataService.users;

  //Capute HTML element
  @ViewChild('swftInput') swftInput: ElementRef;

  // Add an element
  addSWFT(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our 
    if ((value || '').trim()) {

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.SWFTCtrl.setValue(null);
  }

  // Select element in dropdown
  selectedSWFT(event: MatAutocompleteSelectedEvent): void {
    this.newProject.SWFT.push(event.option.value);
    this.swftInput.nativeElement.value = '';
    this.SWFTCtrl.setValue(null);
  }

  //remove element
  removeSWFT(tc, indx): void {
    this.newProject.SWFT.splice(indx, 1);
  }


  //Filter
  private _filterSWFT(value: any): any[] {
    let dd = String(value);
    return this.allSWFT.filter(swft => swft.username.toLowerCase().includes(dd.toLowerCase()));
  }

  /** CCM */

  //ListVariables
  CCMCtrl = new FormControl();
  FilteredCCM: Observable<string[]>;

  //Array of GET
  allCCM: User[] = this.userDataService.users;

  //Capute HTML element
  @ViewChild('ccmInput') ccmInput: ElementRef;

  // Add an element
  addCCM(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our 
    if ((value || '').trim()) {

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.CCMCtrl.setValue(null);
  }

  // Select element in dropdown
  selectedCCM(event: MatAutocompleteSelectedEvent): void {
    this.newProject.CCM.push(event.option.value);
    this.ccmInput.nativeElement.value = '';
    this.CCMCtrl.setValue(null);
  }

  //remove element
  removeCCM(tc, indx): void {
    this.newProject.CCM.splice(indx, 1);
  }


  //Filter
  private _filterCCM(value: any): any[] {
    let dd = String(value);
    return this.allCCM.filter(ccm => ccm.username.toLowerCase().includes(dd.toLowerCase()));
  }


  /** QM */

  //ListVariables
  QMCtrl = new FormControl();
  FilteredQM: Observable<string[]>;

  //Array of GET
  allQM: User[] = this.userDataService.users;

  //Capute HTML element
  @ViewChild('qmInput') qmInput: ElementRef;

  // Add an element
  addQM(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our 
    if ((value || '').trim()) {

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.QMCtrl.setValue(null);
  }

  // Select element in dropdown
  selectedQM(event: MatAutocompleteSelectedEvent): void {
    this.newProject.QM.push(event.option.value);
    this.qmInput.nativeElement.value = '';
    this.QMCtrl.setValue(null);
  }

  //remove element
  removeQM(qm, indx): void {
    this.newProject.QM.splice(indx, 1);
  }


  //Filter
  private _filterQM(value: any): any[] {
    let dd = String(value);
    return this.allQM.filter(qm => qm.username.toLowerCase().includes(dd.toLowerCase()));
  }

  /** SM */

  //ListVariables
  SMCtrl = new FormControl();
  FilteredSM: Observable<string[]>;

  //Array of GET
  allSM: User[] = this.userDataService.users;

  //Capute HTML element
  @ViewChild('smInput') smInput: ElementRef;

  // Add an element
  addSM(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our 
    if ((value || '').trim()) {

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.SMCtrl.setValue(null);
  }

  // Select element in dropdown
  selectedSM(event: MatAutocompleteSelectedEvent): void {
    this.newProject.SM.push(event.option.value);
    this.smInput.nativeElement.value = '';
    this.SMCtrl.setValue(null);
  }

  //remove element
  removeSM(sm, indx): void {
    this.newProject.SM.splice(indx, 1);
  }


  //Filter
  private _filterSM(value: any): any[] {
    let dd = String(value);
    return this.allSM.filter(sm => sm.username.toLowerCase().includes(dd.toLowerCase()));
  }

}
