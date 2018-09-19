import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../model/user/user';
import { UserDataService } from '../../model/user/user-data.service';
import { Project } from '../../model/project/project';

@Component({
  selector: 'mdb-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: []

})

export class HomeComponent {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  newProject :Project; 

  //set FilteredList
  constructor(private userDataService: UserDataService) {
    this.newProject = new Project(); 
  
    this.FilteredPM = this.PMCtrl.valueChanges.pipe(
      startWith(null),
      map((pm: String | null) => pm ? this._filterPM(pm) : this.allPM.slice()));

      this.FilteredSEint = this.SEintCtrl.valueChanges.pipe(
        startWith(null),
        map((seint: String | null) => seint ? this._filterSEint(seint) : this.allSEint.slice()));
  }

/*
      id: number;
    name: string;
    startdate: Date;
    enddate: Date;
    type: string;
    description: string;
    PM: User[];
    SEint: User[];
    SEext: User[];
    TC: User[];
    SWFT: User[];
    CCM: User[];
    QM: User[];
    SM: User[];
    topics: Topic[];
    loges: Loge[];
    progress: number;
    budget: number; 
    phase: number; 
*/



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


}