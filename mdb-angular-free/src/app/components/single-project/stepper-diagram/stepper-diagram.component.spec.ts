import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperDiagramComponent } from './stepper-diagram.component';

describe('StepperDiagramComponent', () => {
  let component: StepperDiagramComponent;
  let fixture: ComponentFixture<StepperDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
