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
import { MessageComponent } from './components/messages/messages.component';
import { OrderComponent } from './components/orders/orders.component';
import { MatButtonModule, MatIconModule,MatExpansionModule, MatListModule, MatChipsModule, MatFormFieldModule } from '@angular/material';
import { ProjectsComponent } from './components/projects/projects.component';
import {MatTableModule} from '@angular/material/table';
import { TablecomponentsComponent } from './components/tablecomponents/tablecomponents.component';
import { FilterPipe } from './pipes/filter.pipe';
import {  ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { ProjectpipePipe } from './pipes/projectpipe.pipe';
import { SingleProjectComponent } from './components/single-project/single-project.component';






@NgModule({
  declarations: [
    AppComponent, TestComponent, HomeComponent, EditComponent, MessageComponent, OrderComponent, ProjectsComponent, TablecomponentsComponent, FilterPipe, UserComponent, ProjectpipePipe, SingleProjectComponent,
  ],
  imports: [
    BrowserModule,
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
    ReactiveFormsModule
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
        path: 'mdb-msg',
        component: MessageComponent
      },
      {
        path: 'mdb-order',
        component: OrderComponent
      }, 
      {
        path: 'projects', 
        component: ProjectsComponent
      },
      {
        path:'table',
        component: TablecomponentsComponent
      }, 
      {
        path:'test', 
        component:TestComponent
      },
      {
        path:'users', 
        component:UserComponent
      },
      {
        path:'singleproject', 
        component:SingleProjectComponent
      }, 
      {
        path:"home",
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
