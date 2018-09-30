import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from './typescripts/free';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { RouterModule } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { MatAutocompleteModule, MatButtonModule, MatIconModule, MatExpansionModule, MatListModule, MatChipsModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatSnackBarModule, MatStepperModule, MatRadioModule } from '@angular/material';
import { ProjectsComponent } from './components/projects/projects.component';
import { MatTableModule } from '@angular/material/table';
import { TablecomponentsComponent } from './components/tablecomponents/tablecomponents.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { ProjectpipePipe } from './pipes/projectpipe.pipe';
import { SingleProjectComponent } from './components/single-project/single-project.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { StepperDiagramComponent } from './components/single-project/stepper-diagram/stepper-diagram.component';




@NgModule({
  declarations: [
    AppComponent, TestComponent, HomeComponent, EditComponent, ProjectsComponent, TablecomponentsComponent, FilterPipe, UserComponent, ProjectpipePipe, SingleProjectComponent, EditProjectComponent, StepperDiagramComponent,
  ],
  imports: [
    
    MatRadioModule,
    MatAutocompleteModule,
    BrowserModule,
    MatStepperModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatChipsModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSelectModule
    ,
    RouterModule.forRoot([
      {
        path: 'mdb-home',
        component: HomeComponent
      },
      {
        path: 'mdb-edit',
        component: EditComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'table',
        component: TablecomponentsComponent
      },
      {
        path: 'edit-project',
        component: EditProjectComponent
      },
      {
        path: 'test',
        component: TestComponent
      },
      {
        path: 'users',
        component: UserComponent
      },
      {
        path: 'singleproject',
        component: SingleProjectComponent
      },
      {
        path: "home",
        component: HomeComponent
      }
    ]),
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
