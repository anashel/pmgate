import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../model/project/project';

@Component({
  selector: 'stepper-diagram',
  templateUrl: './stepper-diagram.component.html',
  styleUrls: ['./stepper-diagram.component.scss']
})
export class StepperDiagramComponent implements OnInit {
  //selectedPhase: number;
  @Input() myProject: Project;
  @Input() selectedPhase: string;

  constructor() {
   // this.selectedPhase = this.myProject.phase;
    
   }

  ngOnInit() {
  }

  @Output()
  phaseChanged = new EventEmitter<number>();

 /**
 * Select a phase in the stepper and setup the topics in that phase
 * @param phase 
 */
  selectPhase(phase: number) {
    this.phaseChanged.emit(phase);
  }




}
